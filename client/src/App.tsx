import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  Project, 
  WorkSession, 
  WorkSnapshot, 
  UserSettings, 
  InsightsData 
} from './types';
import { api, INITIAL_DEMO_DATA } from './services/api';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { WorkMemoryPage } from './pages/WorkMemoryPage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { StartSessionModal } from './components/StartSessionModal';
import { NewProjectModal } from './components/NewProjectModal';
import { EndSessionModal } from './components/EndSessionModal';
import { AIProcessingModal } from './components/AIProcessingModal';
import { WorkSnapshotModal } from './components/WorkSnapshotModal';
import { ActiveSessionView } from './components/ActiveSessionView';
import { BrainCircuit, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  // Initialize with initial demo data so it NEVER renders empty on frame 0
  const [projects, setProjects] = useState<Project[]>(INITIAL_DEMO_DATA.projects);
  const [sessions, setSessions] = useState<WorkSession[]>(INITIAL_DEMO_DATA.sessions);
  const [memories, setMemories] = useState<WorkSnapshot[]>(INITIAL_DEMO_DATA.snapshots);
  const [activeSession, setActiveSession] = useState<WorkSession | null>(null);
  const [recentSnapshot, setRecentSnapshot] = useState<WorkSnapshot | null>(INITIAL_DEMO_DATA.snapshots[0]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_DEMO_DATA.projects[0]);
  const [insights, setInsights] = useState<InsightsData | null>({
    mostActiveProject: { name: 'PeopleHub', sessionCount: 5, minutes: 210 },
    mostCommonBlocker: { issue: '401 Authentication Error', occurrences: 4, category: 'Auth / Security' },
    averageSessionDurationMinutes: 45,
    projectsRecentlyResumed: 4,
    workSessionsCompleted: 8,
    totalFocusHours: 8.5,
    continuityScore: 98,
    weeklyVelocity: [
      { day: 'Mon', minutes: 120, sessions: 3 },
      { day: 'Tue', minutes: 180, sessions: 4 },
      { day: 'Wed', minutes: 90, sessions: 2 },
      { day: 'Thu', minutes: 210, sessions: 5 },
      { day: 'Fri', minutes: 150, sessions: 3 },
      { day: 'Sat', minutes: 80, sessions: 2 },
      { day: 'Sun', minutes: 140, sessions: 3 }
    ]
  });
  const [settings, setSettings] = useState<UserSettings | null>(INITIAL_DEMO_DATA.settings);

  // Modals state
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [preselectedProjectId, setPreselectedProjectId] = useState<string | undefined>(undefined);
  const [preselectedTask, setPreselectedTask] = useState<string | undefined>(undefined);

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isEndSessionModalOpen, setIsEndSessionModalOpen] = useState(false);
  const [isAIProcessingOpen, setIsAIProcessingOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<WorkSnapshot | null>(null);
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);
  const [isNewSnapshotGenerated, setIsNewSnapshotGenerated] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load Data
  const loadData = async () => {
    try {
      const [projList, sessList, memList, activeSess, recSnap, insData, setts] = await Promise.all([
        api.getProjects(),
        api.getSessions(),
        api.getMemories(),
        api.getActiveSession(),
        api.getRecentMemory(),
        api.getInsights(),
        api.getSettings()
      ]);

      if (projList && projList.length > 0) setProjects(projList);
      if (sessList && sessList.length > 0) setSessions(sessList);
      if (memList && memList.length > 0) {
        setMemories(memList);
        setRecentSnapshot(recSnap || memList[0] || null);
      }
      setActiveSession(activeSess);
      if (insData) setInsights(insData);
      if (setts) setSettings(setts);
    } catch (err) {
      console.error('Failed to load ThreadBack data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers
  const handleStartSessionPrompt = (project?: Project, task?: string) => {
    if (project) {
      setPreselectedProjectId(project.id);
      setPreselectedTask(task || project.currentTask || '');
    } else {
      setPreselectedProjectId(undefined);
      setPreselectedTask(undefined);
    }
    setIsStartModalOpen(true);
  };

  const handleStartSession = async (data: { projectId: string; task: string; goal: string; notes?: string }) => {
    try {
      const newSession = await api.startSession(data);
      setActiveSession(newSession);
      showToast(`Started session on ${newSession.projectName}`);
      await loadData();
      if (currentTab !== 'home') setCurrentTab('home');
    } catch (err: any) {
      alert(`Could not start session: ${err.message}`);
    }
  };

  const handleAddSessionNote = async (text: string, category?: string) => {
    if (!activeSession) return;
    try {
      const note = await api.addSessionNote(activeSession.id, text, category);
      setActiveSession(prev => prev ? { ...prev, notes: [...prev.notes, note] } : null);
    } catch (err: any) {
      alert(`Could not add note: ${err.message}`);
    }
  };

  const handleEndSessionSubmit = async (reflections: {
    accomplished?: string;
    stoppedWhy?: string;
    rememberNote?: string;
    rawNotes?: string;
  }) => {
    if (!activeSession) return;
    setIsEndSessionModalOpen(false);
    setIsAIProcessingOpen(true);

    try {
      const result = await api.endSession(activeSession.id, reflections);
      
      setTimeout(async () => {
        setIsAIProcessingOpen(false);
        setActiveSession(null);
        setSelectedSnapshot(result.snapshot);
        setIsNewSnapshotGenerated(true);
        setIsSnapshotModalOpen(true);
        showToast('Work Memory Snapshot synthesized!');
        await loadData();
      }, 1600);
    } catch (err: any) {
      setIsAIProcessingOpen(false);
      alert(`Failed to end session: ${err.message}`);
    }
  };

  const handleContinueWorkFromSnapshot = async (snapshot: WorkSnapshot) => {
    // When clicking Continue Work, immediately start the active session for that project and task!
    try {
      const targetProject = projects.find(p => p.id === snapshot.projectId) || projects[0];
      const nextTask = snapshot.whileYouWereAway?.updatedNextAction || snapshot.nextAction || snapshot.task;
      
      const newSession = await api.startSession({
        projectId: targetProject.id,
        task: snapshot.task,
        goal: nextTask,
        notes: `Resumed from Work Memory #${snapshot.id.slice(-4)}. Previous blocker: ${snapshot.blocker}`
      });

      setActiveSession(newSession);
      showToast(`Resumed work on ${newSession.projectName} / ${newSession.task}`);
      await loadData();
      if (currentTab !== 'home') setCurrentTab('home');
    } catch (err: any) {
      handleStartSessionPrompt(projects.find(p => p.id === snapshot.projectId), snapshot.nextAction);
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentTab('project-detail');
  };

  const handleCreateProject = async (data: { name: string; description: string; goal: string; color?: string; tags?: string[] }) => {
    const newProj = await api.createProject(data);
    showToast(`Created project "${newProj.name}"`);
    await loadData();
  };

  const handleUpdateSettings = async (newSettings: Partial<UserSettings> & { geminiApiKey?: string }) => {
    const updated = await api.updateSettings(newSettings);
    setSettings(updated);
    showToast('Settings saved successfully');
  };

  const handleResetDemo = async () => {
    await api.resetDemo();
    await loadData();
    showToast('Reset to demo state');
  };

  // If user is on landing page
  if (currentTab === 'landing') {
    return <LandingPage onEnterApp={() => setCurrentTab('home')} />;
  }

  return (
    <div className="flex min-h-screen bg-dark-950 text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (tab === 'project-detail' && !selectedProject) {
            setSelectedProject(projects[0] || null);
          }
          setCurrentTab(tab);
        }}
        activeSession={activeSession}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        onOpenStartSession={() => handleStartSessionPrompt()}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 max-w-7xl mx-auto overflow-y-auto">
        {/* Active Session Top Bar / Banner if currently working */}
        {activeSession && (
          <ActiveSessionView
            session={activeSession}
            onAddNote={handleAddSessionNote}
            onEndSessionClick={() => setIsEndSessionModalOpen(true)}
          />
        )}

        {/* Tab Router */}
        {currentTab === 'home' && (
          <DashboardPage
            projects={projects}
            sessions={sessions}
            recentSnapshot={recentSnapshot}
            onOpenProject={handleOpenProject}
            onStartSession={handleStartSessionPrompt}
            onContinueWork={handleContinueWorkFromSnapshot}
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
            onViewSnapshotDetails={(snap) => {
              setSelectedSnapshot(snap);
              setIsNewSnapshotGenerated(false);
              setIsSnapshotModalOpen(true);
            }}
            onViewAllProjects={() => setCurrentTab('projects')}
            onViewAllMemories={() => setCurrentTab('memory')}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsPage
            projects={projects}
            onOpenProject={handleOpenProject}
            onStartSession={handleStartSessionPrompt}
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
          />
        )}

        {currentTab === 'project-detail' && selectedProject && (
          <ProjectDetailPage
            project={selectedProject}
            memories={memories}
            sessions={sessions}
            onBack={() => setCurrentTab('projects')}
            onStartSession={handleStartSessionPrompt}
            onViewSnapshotDetails={(snap) => {
              setSelectedSnapshot(snap);
              setIsNewSnapshotGenerated(false);
              setIsSnapshotModalOpen(true);
            }}
            onResumeMemory={handleContinueWorkFromSnapshot}
          />
        )}

        {currentTab === 'memory' && (
          <WorkMemoryPage
            memories={memories}
            projects={projects}
            onViewSnapshotDetails={(snap) => {
              setSelectedSnapshot(snap);
              setIsNewSnapshotGenerated(false);
              setIsSnapshotModalOpen(true);
            }}
            onResumeMemory={handleContinueWorkFromSnapshot}
          />
        )}

        {currentTab === 'insights' && (
          <InsightsPage insights={insights} />
        )}

        {currentTab === 'settings' && settings && (
          <SettingsPage
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      {/* Global Modals */}
      <StartSessionModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        projects={projects}
        preselectedProjectId={preselectedProjectId}
        preselectedTask={preselectedTask}
        onStartSession={handleStartSession}
      />

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      {activeSession && (
        <EndSessionModal
          isOpen={isEndSessionModalOpen}
          onClose={() => setIsEndSessionModalOpen(false)}
          session={activeSession}
          onGenerateMemory={handleEndSessionSubmit}
        />
      )}

      <AIProcessingModal
        isOpen={isAIProcessingOpen}
        projectName={activeSession?.projectName || 'Project'}
      />

      <WorkSnapshotModal
        isOpen={isSnapshotModalOpen}
        onClose={() => setIsSnapshotModalOpen(false)}
        snapshot={selectedSnapshot}
        onContinueWork={handleContinueWorkFromSnapshot}
        isNew={isNewSnapshotGenerated}
      />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-900 border border-purple-500/50 shadow-neon-purple text-white text-xs px-4 py-3 rounded-xl flex items-center space-x-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
