import React from 'react';
import { 
  ArrowLeft, 
  Play, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Calendar, 
  GitPullRequest,
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Project, WorkSnapshot, WorkSession } from '../types';
import { MemoryCard } from '../components/MemoryCard';

interface ProjectDetailPageProps {
  project: Project;
  memories: WorkSnapshot[];
  sessions: WorkSession[];
  onBack: () => void;
  onStartSession: (project: Project, task?: string) => void;
  onViewSnapshotDetails: (snapshot: WorkSnapshot) => void;
  onResumeMemory: (snapshot: WorkSnapshot) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  memories,
  sessions,
  onBack,
  onStartSession,
  onViewSnapshotDetails,
  onResumeMemory
}) => {
  const projectMemories = memories.filter(m => m.projectId === project.id);
  const projectSessions = sessions.filter(s => s.projectId === project.id);
  const latestSnapshot = projectMemories[0] || project.lastSnapshot;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-dark-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStartSession(project, project.currentTask)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-neon-purple shadow-sm transition-all duration-200 flex items-center space-x-2 hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Work Session</span>
          </button>
        </div>
      </div>

      {/* Project Overview Card */}
      <div className="rounded-2xl bg-gradient-to-b from-dark-850 via-dark-850 to-dark-900 border border-purple-500/30 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-1.5">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color || '#A855F7' }}
              />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.name}
              </h1>
              <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-semibold">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-dark-300 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-dark-400 font-medium">Progress</div>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">
              {project.progress}%
            </div>
          </div>
        </div>

        {/* Goal Banner */}
        {project.goal && (
          <div className="p-3.5 rounded-xl bg-dark-900/80 border border-dark-750 flex items-center space-x-2.5 mb-6 text-xs text-slate-200">
            <Target className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong className="text-white">Goal:</strong> {project.goal}</span>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-cyan-400"
            style={{ width: `${Math.min(100, Math.max(5, project.progress))}%` }}
          />
        </div>

        {/* Current State Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-dark-900/90 border border-dark-800">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-dark-400 mb-1">
              Current Active Task
            </div>
            <div className="text-sm font-bold text-white">
              {project.currentTask || 'Core setup'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-purple-500/30">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center space-x-1.5 mb-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recommended Next Action</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {latestSnapshot?.nextAction || `Continue development on ${project.currentTask}`}
            </div>
          </div>
        </div>
      </div>

      {/* What Changed While You Were Away banner for this project */}
      {latestSnapshot?.whileYouWereAway?.detected && (
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mt-0.5">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              While you were away from {project.name}
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              {latestSnapshot.whileYouWereAway.headline}
            </div>
            <p className="text-xs text-dark-300 mt-1">
              {latestSnapshot.whileYouWereAway.details}
            </p>
          </div>
        </div>
      )}

      {/* Project Work Memory Stack */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h2 className="text-base font-bold text-white">
              Work Memory Snapshots ({projectMemories.length})
            </h2>
          </div>
          <span className="text-xs text-dark-400">Reconstructed state history</span>
        </div>

        {projectMemories.length === 0 ? (
          <div className="p-8 rounded-2xl bg-dark-850/60 border border-dark-750 text-center text-xs text-dark-400">
            No work memory snapshots generated yet for this project.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectMemories.map(memory => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onClick={onViewSnapshotDetails}
                onResume={onResumeMemory}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Session Logs */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h2 className="text-base font-bold text-white">
            Session History
          </h2>
        </div>

        <div className="rounded-2xl bg-dark-850/80 border border-dark-750 overflow-hidden divide-y divide-dark-750/70">
          {projectSessions.length === 0 ? (
            <div className="p-6 text-center text-xs text-dark-400">
              No sessions recorded yet for {project.name}.
            </div>
          ) : (
            projectSessions.map(sess => (
              <div key={sess.id} className="p-4 flex items-center justify-between hover:bg-dark-800/40 transition-colors">
                <div>
                  <div className="text-xs font-bold text-white">{sess.task}</div>
                  <div className="text-[11px] text-dark-400 mt-0.5">
                    {sess.notes.length} notes captured • {new Date(sess.startTime).toLocaleDateString()}
                  </div>
                </div>

                <button
                  onClick={() => onStartSession(project, sess.task)}
                  className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-purple-600/20 text-xs text-purple-300 border border-dark-700 hover:border-purple-500/40 transition-all flex items-center space-x-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Restart</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
