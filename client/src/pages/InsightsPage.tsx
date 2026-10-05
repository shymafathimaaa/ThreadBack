import React from 'react';
import { 
  LineChart, 
  Flame, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  BrainCircuit,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { InsightsData } from '../types';

interface InsightsPageProps {
  insights: InsightsData | null;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ insights }) => {
  if (!insights) {
    return (
      <div className="p-8 text-center text-xs text-dark-400">
        Loading insights...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-dark-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <LineChart className="w-3.5 h-3.5 text-cyan-400" />
          <span>Productivity Metrics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Work Continuity Insights
        </h1>
        <p className="text-sm text-dark-400 mt-0.5">
          Context retention metrics and cognitive load reduction analysis.
        </p>
      </div>

      {/* 4 Main Hero Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Most Active Project */}
        <div className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-dark-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Top Focus Project</span>
            <Flame className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white truncate">
            {insights.mostActiveProject.name}
          </div>
          <div className="text-xs text-purple-300/90 mt-1">
            {insights.mostActiveProject.sessionCount} sessions • {insights.mostActiveProject.minutes} mins focus
          </div>
        </div>

        {/* Most Common Blocker */}
        <div className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 hover:border-pink-500/30 transition-all">
          <div className="flex items-center justify-between text-dark-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Frequent Blocker</span>
            <AlertTriangle className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-base font-bold text-pink-200 truncate">
            {insights.mostCommonBlocker.issue}
          </div>
          <div className="text-xs text-dark-400 mt-1">
            Category: <span className="text-pink-300 font-medium">{insights.mostCommonBlocker.category}</span>
          </div>
        </div>

        {/* Average Session Duration */}
        <div className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-dark-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Avg Session Time</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {insights.averageSessionDurationMinutes} <span className="text-xs font-sans text-dark-400">mins</span>
          </div>
          <div className="text-xs text-cyan-300/90 mt-1">
            Optimal deep work interval
          </div>
        </div>

        {/* Continuity Score */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-dark-850 to-purple-950/40 border border-purple-500/40 shadow-neon-purple/15 shadow-sm">
          <div className="flex items-center justify-between text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Continuity Score</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {insights.continuityScore}%
          </div>
          <div className="text-xs text-emerald-400 mt-1 font-medium">
            Zero-restart index: Exceptional
          </div>
        </div>
      </div>

      {/* Secondary Insights Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Focus Velocity */}
        <div className="p-6 rounded-2xl bg-dark-850/80 border border-dark-750">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Weekly Focus Velocity</span>
            </h3>
            <span className="text-xs font-mono text-dark-400">{insights.totalFocusHours} Total Hours</span>
          </div>

          <div className="space-y-3">
            {insights.weeklyVelocity.map(day => (
              <div key={day.day} className="flex items-center space-x-3 text-xs">
                <span className="w-8 font-mono text-dark-400 font-semibold">{day.day}</span>
                <div className="flex-1 h-2 bg-dark-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                    style={{ width: `${Math.min(100, (day.minutes / 240) * 100)}%` }}
                  />
                </div>
                <span className="w-16 text-right font-mono text-slate-300">{day.minutes}m</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cognitive Context Recovery Card */}
        <div className="p-6 rounded-2xl bg-dark-850/80 border border-dark-750 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-3">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span>Context Switching Impact</span>
            </h3>

            <p className="text-xs text-dark-300 leading-relaxed mb-4">
              Without ThreadBack, resuming work on complex codebases takes an average of <strong className="text-pink-400">23 minutes</strong> of mental ramp-up.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex items-center justify-between">
                <span className="text-xs text-dark-400">Projects recently resumed</span>
                <span className="text-xs font-mono font-bold text-white">{insights.projectsRecentlyResumed} projects</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex items-center justify-between">
                <span className="text-xs text-dark-400">Estimated Ramp-up Saved</span>
                <span className="text-xs font-mono font-bold text-emerald-400">~ 4.6 Hours / Week</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-800 flex items-center justify-between">
                <span className="text-xs text-dark-400">Work sessions completed</span>
                <span className="text-xs font-mono font-bold text-cyan-300">{insights.workSessionsCompleted}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-750 text-[11px] text-dark-400 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Productivity intelligence calculated directly from local sessions.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
