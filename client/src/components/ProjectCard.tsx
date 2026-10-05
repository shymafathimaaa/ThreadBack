import React from 'react';
import { Play, ArrowUpRight, Clock, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenProject: (project: Project) => void;
  onStartSession: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenProject,
  onStartSession
}) => {
  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours < 1) return 'Active now';
      if (hours === 1) return '1h ago';
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="rounded-2xl bg-dark-850/80 border border-dark-750 hover:border-purple-500/30 transition-all duration-300 p-5 flex flex-col justify-between group shadow-sm hover:shadow-neon-card">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.color || '#A855F7' }}
              />
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                {project.name}
              </h3>
            </div>
            <p className="text-xs text-dark-400 mt-1 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <span className="text-[10px] font-mono text-dark-400 bg-dark-900 border border-dark-750 px-2 py-0.5 rounded flex items-center space-x-1 shrink-0">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(project.lastActive)}</span>
          </span>
        </div>

        {/* Current Task Box */}
        <div className="p-3 rounded-xl bg-dark-900/80 border border-dark-800 mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-dark-400 mb-0.5">
            Current Task
          </div>
          <div className="text-xs font-semibold text-slate-200 truncate">
            {project.currentTask || 'General milestones'}
          </div>
          {project.lastSnapshot?.nextAction && (
            <div className="text-[11px] text-cyan-400/90 mt-1 truncate">
              → Next: {project.lastSnapshot.nextAction}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-dark-400 mb-1.5">
            <span>Overall Progress</span>
            <span className="text-white font-mono">{project.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-cyan-400"
              style={{ width: `${Math.min(100, Math.max(5, project.progress))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-dark-750/70 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenProject(project)}
          className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-xs font-medium text-dark-200 hover:text-white transition-colors flex items-center space-x-1"
        >
          <span>Open Project</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-dark-400" />
        </button>

        <button
          onClick={() => onStartSession(project)}
          className="px-3.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all flex items-center space-x-1.5 hover:shadow-neon-purple"
        >
          <Play className="w-3 h-3 fill-current text-purple-400" />
          <span>Start Session</span>
        </button>
      </div>
    </div>
  );
};
