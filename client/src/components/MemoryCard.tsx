import React from 'react';
import { CheckCircle2, AlertTriangle, Compass, Layers, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { WorkSnapshot } from '../types';

interface MemoryCardProps {
  memory: WorkSnapshot;
  onClick: (memory: WorkSnapshot) => void;
  onResume: (memory: WorkSnapshot) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  onClick,
  onResume
}) => {
  const formattedDate = new Date(memory.timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = new Date(memory.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      onClick={() => onClick(memory)}
      className="rounded-2xl bg-dark-850/80 border border-dark-750 hover:border-purple-500/40 p-5 cursor-pointer transition-all duration-300 hover:shadow-neon-card group flex flex-col justify-between"
    >
      <div>
        {/* Top Meta Line */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
              {memory.projectName}
            </span>
            <span className="text-dark-600">•</span>
            <span className="text-xs text-cyan-300 font-medium truncate">
              {memory.task}
            </span>
          </div>

          <div className="flex items-center space-x-1 text-[10px] font-mono text-dark-400 bg-dark-900 border border-dark-750 px-2 py-0.5 rounded shrink-0">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate} {formattedTime}</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-2 mb-4">
          {/* Completed */}
          <div className="flex items-start space-x-2 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
            <span className="text-slate-200 line-clamp-1 font-medium">{memory.completed}</span>
          </div>

          {/* Decision */}
          {memory.decision && (
            <div className="flex items-start space-x-2 text-xs">
              <Layers className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
              <span className="text-dark-300 line-clamp-1">{memory.decision}</span>
            </div>
          )}

          {/* Blocker */}
          <div className="flex items-start space-x-2 text-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-pink-400 mt-0.5 shrink-0" />
            <span className="text-pink-300/90 line-clamp-1">{memory.blocker}</span>
          </div>
        </div>

        {/* Recommended Next Action */}
        <div className="p-2.5 rounded-xl bg-dark-900/90 border border-dark-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center space-x-1 mb-0.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>Next Action</span>
          </div>
          <div className="text-xs font-semibold text-slate-100 truncate">
            {memory.nextAction}
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="mt-4 pt-3 border-t border-dark-750/60 flex items-center justify-between">
        <span className="text-[11px] text-dark-400 group-hover:text-dark-200 transition-colors">
          View full context snapshot →
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onResume(memory);
          }}
          className="px-3 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-200 text-xs font-semibold transition-colors flex items-center space-x-1"
        >
          <span>Resume</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
