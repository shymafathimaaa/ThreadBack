import React, { useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  AlertTriangle, 
  Compass, 
  Info, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkSnapshot } from '../types';

interface WorkSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshot: WorkSnapshot | null;
  onContinueWork: (snapshot: WorkSnapshot) => void;
  isNew?: boolean;
}

export const WorkSnapshotModal: React.FC<WorkSnapshotModalProps> = ({
  isOpen,
  onClose,
  snapshot,
  onContinueWork,
  isNew = false
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && isNew) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#A855F7', '#06B6D4', '#F43F5E', '#10B981']
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen, isNew]);

  if (!isOpen || !snapshot) return null;

  const handleCopy = () => {
    const text = `## ThreadBack Work Snapshot: ${snapshot.projectName}
**Task:** ${snapshot.task}
**Goal:** ${snapshot.goal || 'N/A'}

- **Completed:** ${snapshot.completed}
- **Decision:** ${snapshot.decision}
- **Blocker:** ${snapshot.blocker} ${snapshot.blockerCause ? `(${snapshot.blockerCause})` : ''}
- **Next Action:** ${snapshot.nextAction}

*Context:* ${snapshot.context}
*Saved at:* ${new Date(snapshot.timestamp).toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-dark-900 border border-purple-500/40 shadow-2xl shadow-purple-950/60 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-750 bg-gradient-to-r from-dark-850 via-dark-850 to-purple-950/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">AI Work Snapshot</h3>
                {isNew && (
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Generated & Saved
                  </span>
                )}
              </div>
              <p className="text-xs text-dark-400">
                Contextual state for <span className="text-purple-300 font-semibold">{snapshot.projectName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 hover:text-white transition-colors text-xs flex items-center space-x-1.5 border border-dark-700"
              title="Copy markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Project & Task Banner */}
          <div className="p-4 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-dark-400">Project / Task</div>
              <div className="text-lg font-bold text-white flex items-center space-x-2 mt-0.5">
                <span>{snapshot.projectName}</span>
                <span className="text-dark-600">/</span>
                <span className="text-cyan-400">{snapshot.task}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-mono text-dark-400">
                {new Date(snapshot.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Structured Work Continuity Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Completed */}
            <div className="p-4 rounded-xl bg-dark-850/60 border border-dark-750 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>✓ Completed</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {snapshot.completed}
              </p>
            </div>

            {/* Decision */}
            <div className="p-4 rounded-xl bg-dark-850/60 border border-dark-750 hover:border-purple-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400 mb-2">
                <Layers className="w-4 h-4" />
                <span>◆ Key Decision</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {snapshot.decision}
              </p>
            </div>

            {/* Blocker */}
            <div className="p-4 rounded-xl bg-dark-850/60 border border-dark-750 hover:border-pink-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-semibold text-pink-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>⚠ Blocker / Stopping Point</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {snapshot.blocker}
              </p>
              {snapshot.blockerCause && (
                <p className="text-[11px] text-dark-400 mt-1 font-mono">
                  Cause: {snapshot.blockerCause}
                </p>
              )}
            </div>

            {/* Context Summary */}
            <div className="p-4 rounded-xl bg-dark-850/60 border border-dark-750 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 mb-2">
                <Info className="w-4 h-4" />
                <span>Context State</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {snapshot.context}
              </p>
            </div>
          </div>

          {/* Recommended Next Action Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-dark-850 to-cyan-950/60 border border-purple-500/50 shadow-neon-purple/20 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Recommended Next Action</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {snapshot.nextAction}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-dark-750 bg-dark-850/70 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-xs font-medium text-dark-200 hover:text-white transition-colors"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => {
              onClose();
              onContinueWork(snapshot);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-neon-purple shadow-sm transition-all duration-200 flex items-center space-x-2 group"
          >
            <span>Continue Work from Here</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
