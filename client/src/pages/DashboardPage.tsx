import React from 'react';
import { 
  Sparkles, 
  Play, 
  History, 
  FolderKanban, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Clock, 
  Plus, 
  Zap,
  Flame,
  Calendar
} from 'lucide-react';
import { Project, WorkSession, WorkSnapshot } from '../types';
import { WelcomeBackHero } from '../components/WelcomeBackHero';
import { ProjectCard } from '../components/ProjectCard';

interface DashboardPageProps {
  projects: Project[];
  sessions: WorkSession[];
  recentSnapshot: WorkSnapshot | null;
  onOpenProject: (project: Project) => void;
  onStartSession: (project?: Project, task?: string) => void;
  onContinueWork: (snapshot: WorkSnapshot) => void;
  onOpenNewProject: () => void;
  onViewSnapshotDetails: (snapshot: WorkSnapshot) => void;
  onViewAllProjects: () => void;
  onViewAllMemories: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  projects,
  sessions,
  recentSnapshot,
  onOpenProject,
  onStartSession,
  onContinueWork,
  onOpenNewProject,
  onViewSnapshotDetails,
  onViewAllProjects,
  onViewAllMemories
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const completedSessions = sessions.filter(s => s.status === 'completed').slice(0, 4);

  const formatSessionTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours < 1) return 'Today · Just now';
      if (hours <= 3) return `Today · ${hours} hours ago`;
      if (hours < 24) return `Today · ${hours}h ago`;
      const days = Math.floor(hours / 24);
      return days === 1 ? 'Yesterday' : `${days} days ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Greeting Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-dark-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Flame className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Work Continuity System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {getGreeting()} 👋
          </h1>
          <p className="text-sm text-dark-300 mt-0.5">
            Here's where you left off. Reconstructed context ready for action.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStartSession(projects[0], projects[0]?.currentTask)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-neon-purple shadow-sm transition-all duration-200 flex items-center space-x-1.5 hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Work Session</span>
          </button>
        </div>
      </div>

      {/* Main Hero Section: MOST RECENT WORK */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Most Recent Work</span>
          </h2>
          <button
            onClick={onViewAllMemories}
            className="text-xs text-dark-400 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>All Work Memory</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <WelcomeBackHero
          snapshot={recentSnapshot}
          onContinueWork={onContinueWork}
          onViewDetails={onViewSnapshotDetails}
        />
      </div>

      {/* Active Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-dark-200">
              Active Projects
            </h2>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded font-semibold">
              {projects.length} Active
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenNewProject}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>
            <button
              onClick={onViewAllProjects}
              className="text-xs text-dark-400 hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4 Compact Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenProject={onOpenProject}
              onStartSession={onStartSession}
            />
          ))}
        </div>
      </div>

      {/* Recent Work Sessions Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-dark-200">
              Recent Work Sessions
            </h2>
          </div>
          <span className="text-xs text-dark-400">Click any session to inspect AI snapshot</span>
        </div>

        <div className="rounded-2xl bg-dark-850/80 border border-dark-750 overflow-hidden divide-y divide-dark-750/70">
          {completedSessions.length === 0 ? (
            <div className="p-6 text-center text-xs text-dark-400">
              No previous work sessions yet.
            </div>
          ) : (
            completedSessions.map(s => {
              const durationMins = s.durationSeconds ? Math.round(s.durationSeconds / 60) : 45;
              const matchingSnapshot = recentSnapshot?.sessionId === s.id 
                ? recentSnapshot 
                : {
                    id: s.snapshotId || `snap-${s.id}`,
                    sessionId: s.id,
                    projectId: s.projectId,
                    projectName: s.projectName,
                    task: s.task,
                    goal: s.goal,
                    completed: s.reflections?.accomplished || s.notes[0]?.text || 'Completed task milestones',
                    decision: 'Standardized implementation approach',
                    blocker: s.reflections?.stoppedWhy || '401 authentication error',
                    nextAction: s.reflections?.rememberNote || 'Continue next implementation phase',
                    context: `Work session on ${s.projectName}.`,
                    timestamp: s.endTime || s.startTime
                  } as WorkSnapshot;

              return (
                <div 
                  key={s.id}
                  onClick={() => onViewSnapshotDetails(matchingSnapshot)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-800/60 transition-colors group cursor-pointer"
                >
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-center text-purple-400 mt-0.5 shrink-0 group-hover:border-purple-500/40 transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                          {s.projectName}
                        </span>
                        <span className="text-dark-600">•</span>
                        <span className="text-xs text-cyan-300 font-medium truncate">
                          {s.task}
                        </span>
                      </div>

                      {s.notes && s.notes.length > 0 ? (
                        <p className="text-xs text-dark-300 mt-1 line-clamp-1">
                          “{s.notes[s.notes.length - 1].text}”
                        </p>
                      ) : s.reflections?.accomplished ? (
                        <p className="text-xs text-dark-300 mt-1 line-clamp-1">
                          ✓ {s.reflections.accomplished}
                        </p>
                      ) : (
                        <p className="text-xs text-dark-400 mt-1">
                          {durationMins} min focus session
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-mono text-cyan-300 font-semibold">
                        {formatSessionTimeAgo(s.startTime)}
                      </div>
                      <div className="text-[10px] text-dark-400">
                        {durationMins} min focus
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartSession(projects.find(p => p.id === s.projectId), s.task);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-purple-600/30 hover:border-purple-500/40 border border-dark-700 text-dark-200 hover:text-white transition-all text-xs flex items-center space-x-1.5"
                      title="Resume this task"
                    >
                      <Play className="w-3 h-3 fill-current text-purple-400" />
                      <span>Resume</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
