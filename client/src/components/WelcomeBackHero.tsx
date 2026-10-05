import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  GitPullRequest, 
  Sparkles, 
  Clock, 
  Layers,
  History,
  Info,
  PauseCircle
} from 'lucide-react';
import { WorkSnapshot } from '../types';

interface WelcomeBackHeroProps {
  snapshot: WorkSnapshot | null;
  onContinueWork: (snapshot: WorkSnapshot) => void;
  onViewDetails?: (snapshot: WorkSnapshot) => void;
}

export const WelcomeBackHero: React.FC<WelcomeBackHeroProps> = ({
  snapshot,
  onContinueWork,
  onViewDetails
}) => {
  if (!snapshot) {
    return (
      <div className="rounded-2xl bg-dark-850/80 border border-dark-750 p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-white">No active work session recorded yet</h3>
        <p className="text-xs text-dark-400 max-w-md mx-auto mt-1">
          Start your first work session. ThreadBack will automatically capture your context, decisions, and blockers so you never restart from zero.
        </p>
      </div>
    );
  }

  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours < 1) return 'Today · Just recently';
      if (hours === 1) return 'Today · 1 hour ago';
      if (hours < 24) return `Today · ${hours} hours ago`;
      const days = Math.floor(hours / 24);
      return days === 1 ? 'Yesterday' : `${days} days ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-dark-850 via-dark-850 to-dark-900 border border-purple-500/40 shadow-neon-hero overflow-hidden group transition-all duration-300 hover:border-purple-400/60">
      {/* Top subtle ambient neon gradient line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-600 opacity-90" />
      
      {/* Background glow radials */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-8 relative z-10">
        {/* Top line: Work Continuity Badge + Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Work Continuity Active</span>
            </span>
            <span className="text-xs text-dark-300 flex items-center space-x-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-dark-400" />
              <span>{formatTimeAgo(snapshot.timestamp)}</span>
            </span>
          </div>

          <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>AI Memory #{snapshot.id.slice(-4)}</span>
          </div>
        </div>

        {/* Project Title & Context Banner */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1">
            You were working on
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {snapshot.projectName}
            </h2>
            <span className="text-dark-500 text-lg font-normal">/</span>
            <span className="text-lg sm:text-xl font-bold text-cyan-300">
              {snapshot.task}
            </span>
          </div>

          {/* You stopped here callout */}
          <div className="mt-3 p-3 rounded-xl bg-dark-900/90 border border-dark-750/90 flex items-center space-x-2.5">
            <PauseCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-dark-300 uppercase tracking-wider text-[10px] mr-1.5">You stopped here:</span>
              <span className="text-white font-medium">
                {snapshot.context.includes('Connecting') ? snapshot.context.split('.')[0] : 'Connecting the employee form to the backend'}
              </span>
            </div>
          </div>
        </div>

        {/* What Changed While You Were Away (Key Differentiator Alert) */}
        {snapshot.whileYouWereAway && snapshot.whileYouWereAway.detected && (
          <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/70 via-dark-850 to-purple-950/70 border border-cyan-500/40 flex items-start space-x-3 shadow-neon-cyan/10 shadow-sm animate-fadeIn">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 mt-0.5">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  While you were away
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-200 px-1.5 py-0.2 rounded font-mono font-medium">
                  Diff Sync
                </span>
              </div>
              <p className="text-xs font-bold text-slate-100 mt-0.5">
                {snapshot.whileYouWereAway.headline}
              </p>
              {snapshot.whileYouWereAway.details && (
                <p className="text-[11px] text-dark-300 mt-0.5">
                  {snapshot.whileYouWereAway.details}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 4 Pillars Continuity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
          {/* Completed */}
          <div className="p-3.5 rounded-xl bg-dark-900/90 border border-dark-750/90 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>✓ Completed</span>
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed">
              {snapshot.completed}
            </p>
          </div>

          {/* Decision */}
          <div className="p-3.5 rounded-xl bg-dark-900/90 border border-dark-750/90 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>◆ Decision</span>
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed">
              {snapshot.decision}
            </p>
          </div>

          {/* Blocker */}
          <div className="p-3.5 rounded-xl bg-dark-900/90 border border-dark-750/90 hover:border-pink-500/40 transition-colors">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-pink-400 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>⚠ Blocker / Why You Stopped</span>
            </div>
            <p className="text-xs text-pink-200 font-semibold leading-relaxed">
              {snapshot.blocker}
            </p>
            {snapshot.blockerCause && (
              <p className="text-[11px] text-dark-400 mt-0.5">
                Cause: {snapshot.blockerCause}
              </p>
            )}
          </div>

          {/* Next Action Preview */}
          <div className="p-3.5 rounded-xl bg-dark-900/90 border border-dark-750/90 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>→ Next Action</span>
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed">
              {snapshot.nextAction}
            </p>
          </div>
        </div>

        {/* Bottom Hero Bar: Recommended Next Action + CTA */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/80 via-dark-900 to-cyan-950/80 border border-purple-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-neon-purple/20 shadow-md">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-0.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recommended Next Action</span>
            </div>
            <div className="text-sm font-bold text-white truncate">
              {snapshot.whileYouWereAway?.updatedNextAction || snapshot.nextAction}
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(snapshot)}
                className="px-3.5 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs font-medium text-dark-200 hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <History className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            )}

            <button
              onClick={() => onContinueWork(snapshot)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-neon-purple shadow-md transition-all duration-200 flex items-center space-x-2 group hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Continue Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
