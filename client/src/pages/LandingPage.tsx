import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  GitPullRequest, 
  Zap, 
  ShieldCheck, 
  GitBranch, 
  Code2, 
  Calendar,
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-md border-b border-dark-750/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onEnterApp}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1.5px] shadow-neon-purple/40 shadow-sm">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">ThreadBack</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-dark-300">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#memory" className="hover:text-white transition-colors">Work Memory</a>
            <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onEnterApp}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-neon-purple shadow-sm transition-all duration-200 flex items-center space-x-1.5 hover:scale-105"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 shadow-neon-purple/20 shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Work Continuity System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            THREADBACK
            <span className="block text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-400 via-cyan-300 to-white bg-clip-text text-transparent mt-2">
              “Never restart from zero.”
            </span>
          </h1>

          <p className="text-base sm:text-lg text-dark-200 max-w-2xl mx-auto leading-relaxed mb-8">
            Traditional productivity tools remember <em>what</em> you need to do. <br className="hidden sm:inline" />
            ThreadBack remembers <strong className="text-cyan-300 font-semibold">why</strong> you were doing it, exactly where you stopped, and what to do next.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onEnterApp}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-neon-purple shadow-md transition-all duration-200 flex items-center space-x-2 group hover:scale-105"
            >
              <span>Start Working</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#welcome-back-preview"
              className="px-6 py-3.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-700 text-dark-200 hover:text-white font-medium text-sm transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div id="welcome-back-preview" className="max-w-4xl mx-auto mt-16 relative z-10">
          <div className="rounded-2xl bg-gradient-to-b from-dark-850 via-dark-850 to-dark-900 border border-purple-500/40 shadow-2xl shadow-purple-950/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-dark-750 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Live Welcome Back Preview</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">PeopleHub • In Progress</span>
            </div>

            <div className="mb-6">
              <div className="text-xs font-medium text-dark-400 uppercase tracking-wider">Welcome back 👋 You were working on</div>
              <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
                PeopleHub <span className="text-dark-400 font-normal">/</span> <span className="text-cyan-300">Employee Management</span>
              </div>
            </div>

            {/* What Changed Diff Alert */}
            <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start space-x-3">
              <GitPullRequest className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">While you were away: </span>
                <span className="text-xs text-slate-200">Teammate resolved JWT auth headers in PR #42.</span>
              </div>
            </div>

            {/* 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>✓ Completed</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Employee form UI and Zod validation schemas</p>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-purple-400 mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>◆ Decision</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Use Zod for client/server type inference</p>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-pink-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>⚠ Blocker</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">401 Authentication Error on POST endpoint</p>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-cyan-400 mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>→ Next Action</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Connect employee form to the live POST endpoint</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-750">
              <span className="text-xs text-dark-400 font-medium">Instant zero-friction state recovery</span>
              <button
                onClick={onEnterApp}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-neon-purple flex items-center space-x-2"
              >
                <span>Continue Work →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-6 border-t border-dark-800 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              Context loss is the silent killer of productivity.
            </h2>
            <p className="text-xs sm:text-sm text-dark-400 mt-2">
              Whenever you stop working on a project and return hours or days later, your brain spends 20-30 minutes reconstructing state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-dark-850/60 border border-dark-750">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">“What was I doing?”</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                Re-reading messy code, terminal logs, and tabs trying to remember what was finished and why you stopped.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850/60 border border-dark-750">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">“Why did I make that decision?”</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                Forgetting architectural decisions, schema choices, and rationale, leading to repeated mistakes or rewrites.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850/60 border border-dark-750">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">“What was blocking me?”</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                Hitting the exact same error (e.g. 401 unauthenticated) because the roadblock was never distilled into an actionable next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Flow */}
      <section id="how-it-works" className="py-20 px-6 border-t border-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
              The Continuity Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              How ThreadBack works
            </h2>
            <p className="text-xs sm:text-sm text-dark-400 mt-2">
              From starting a session to returning days later in one continuous loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-5 rounded-2xl bg-dark-850/70 border border-dark-750 relative">
              <div className="text-xs font-mono text-purple-400 font-bold mb-2">01 / START</div>
              <h3 className="text-sm font-bold text-white mb-1">Start Work Session</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                Define your immediate focus and goal. Lock into distraction-free mode with an active timer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-850/70 border border-dark-750 relative">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-2">02 / LOG</div>
              <h3 className="text-sm font-bold text-white mb-1">Quick Note Taker</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                Jot down progress, library choices, or errors as they happen. Zero ceremonial overhead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-850/70 border border-dark-750 relative">
              <div className="text-xs font-mono text-pink-400 font-bold mb-2">03 / DISTILL</div>
              <h3 className="text-sm font-bold text-white mb-1">AI Work Snapshot</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                When you end the session, AI synthesizes decisions, blockers, and single next action into persistent memory.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-850/70 border border-purple-500/40 relative shadow-neon-purple/20 shadow-sm">
              <div className="text-xs font-mono text-purple-300 font-bold mb-2">04 / RESUME</div>
              <h3 className="text-sm font-bold text-white mb-1">Welcome Back Hero</h3>
              <p className="text-xs text-dark-400 leading-relaxed">
                Return later to an immediate briefing of exactly where you stopped and 1-click continue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Integrations & Privacy */}
      <section id="integrations" className="py-20 px-6 border-t border-dark-800 bg-dark-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              Ecosystem & Privacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-3">
              Built for developers & creators
            </h2>
            <p className="text-xs sm:text-sm text-dark-400 mt-2">
              ThreadBack only uses work information you choose to share or connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700 text-purple-400">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">GitHub Sync</h4>
                <p className="text-xs text-dark-400">Sync PR merges and blocker resolutions</p>
                <span className="text-[10px] text-purple-400 font-medium">Demo Available</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700 text-cyan-400">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">VS Code Extension</h4>
                <p className="text-xs text-dark-400">Auto-capture active file context on pause</p>
                <span className="text-[10px] text-cyan-400 font-medium">Demo Integration</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700 text-emerald-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Google Calendar</h4>
                <p className="text-xs text-dark-400">Contextual briefings before meetings</p>
                <span className="text-[10px] text-emerald-400 font-medium">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-16 px-6 border-t border-dark-800 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Ready to never restart from zero?
          </h3>
          <p className="text-xs sm:text-sm text-dark-400 mb-6">
            Jump into the live prototype and experience seamless AI work continuity.
          </p>
          <button
            onClick={onEnterApp}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-neon-purple shadow-md transition-all duration-200"
          >
            Launch ThreadBack App →
          </button>
        </div>
      </footer>
    </div>
  );
};
