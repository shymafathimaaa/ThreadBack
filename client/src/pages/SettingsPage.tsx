import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Sparkles, 
  ShieldCheck, 
  GitBranch, 
  Code2, 
  Calendar, 
  RotateCcw, 
  User, 
  Check, 
  Lock,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsPageProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings> & { geminiApiKey?: string }) => Promise<void>;
  onResetDemo: () => Promise<void>;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  onResetDemo
}) => {
  const [userName, setUserName] = useState(settings.userName);
  const [role, setRole] = useState(settings.role);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [autoSnapshot, setAutoSnapshot] = useState(settings.autoSnapshot);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateSettings({
      userName,
      role,
      autoSnapshot,
      ...(geminiApiKey ? { geminiApiKey } : {})
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = async () => {
    if (confirm('Reset ThreadBack to initial hackathon demo state? All sample projects and snapshots will be refreshed.')) {
      setIsResetting(true);
      try {
        await onResetDemo();
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-dark-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Settings className="w-3.5 h-3.5 text-purple-400" />
          <span>Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Settings & Privacy
        </h1>
        <p className="text-sm text-dark-400 mt-0.5">
          Manage your AI provider, connected developer sources, and privacy rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Section */}
        <div className="p-6 rounded-2xl bg-dark-850/80 border border-dark-750">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2 mb-4">
            <User className="w-4 h-4 text-purple-400" />
            <span>Profile Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-300 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-dark-750 text-white text-xs focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-300 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-dark-750 text-white text-xs focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* AI Engine Settings */}
        <div className="p-6 rounded-2xl bg-dark-850/80 border border-dark-750">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>AI Work Continuity Engine</span>
            </h2>

            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-400">
                {settings.geminiApiKeyConfigured ? 'Gemini 2.5 Flash Active' : 'Deterministic AI Fallback Ready'}
              </span>
            </div>
          </div>

          <p className="text-xs text-dark-300 leading-relaxed mb-4">
            ThreadBack runs with an intelligent, deterministic state reconstruction engine by default. You can optionally supply your Google Gemini API key to activate live generative synthesis.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  <span>Google Gemini API Key (Optional)</span>
                </span>
                <span className="text-[11px] text-dark-400 lowercase font-normal">
                  environment variable: GEMINI_API_KEY
                </span>
              </label>
              <input
                type="password"
                value={geminiApiKey}
                onChange={e => setGeminiApiKey(e.target.value)}
                placeholder={settings.geminiApiKeyConfigured ? '•••••••••••••••• (API key configured)' : 'Paste Gemini API key... (or leave blank to use built-in engine)'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              />
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-dark-900 border border-dark-800">
              <input
                type="checkbox"
                id="autoSnapshot"
                checked={autoSnapshot}
                onChange={e => setAutoSnapshot(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-dark-850 border-dark-700"
              />
              <label htmlFor="autoSnapshot" className="text-xs text-slate-200 cursor-pointer">
                Automatically generate AI Work Snapshot when ending a session
              </label>
            </div>
          </div>
        </div>

        {/* Connected Sources (Integrations) */}
        <div className="p-6 rounded-2xl bg-dark-850/80 border border-dark-750">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Connected Work Sources</span>
          </h2>
          <p className="text-xs text-dark-400 mb-4">
            ThreadBack connects with external developer tools to detect what changed while you were away.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* GitHub */}
            <div className="p-4 rounded-xl bg-dark-900 border border-dark-750 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <GitBranch className="w-5 h-5 text-purple-400" />
                <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-semibold">
                  Demo
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white">GitHub PR Sync</div>
                <div className="text-[11px] text-dark-400 mt-0.5">Detects merged PRs & blocker resolutions</div>
              </div>
              <div className="mt-3 pt-2 border-t border-dark-800 text-[11px] text-emerald-400 font-medium">
                ● Active demo integration
              </div>
            </div>

            {/* VS Code */}
            <div className="p-4 rounded-xl bg-dark-900 border border-dark-750 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded font-semibold">
                  Demo
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white">VS Code Extension</div>
                <div className="text-[11px] text-dark-400 mt-0.5">Auto-captures cursor & file context</div>
              </div>
              <div className="mt-3 pt-2 border-t border-dark-800 text-[11px] text-emerald-400 font-medium">
                ● Active demo integration
              </div>
            </div>

            {/* Google Calendar */}
            <div className="p-4 rounded-xl bg-dark-900 border border-dark-750 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <Calendar className="w-5 h-5 text-dark-400" />
                <span className="text-[10px] font-mono uppercase bg-dark-800 text-dark-400 border border-dark-700 px-1.5 py-0.2 rounded font-semibold">
                  Coming Soon
                </span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-white">Google Calendar</div>
                <div className="text-[11px] text-dark-400 mt-0.5">Contextual focus time blocks</div>
              </div>
              <div className="mt-3 pt-2 border-t border-dark-800 text-[11px] text-dark-400">
                Planned for v2.0
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Positioning */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-850 via-dark-850 to-emerald-950/20 border border-emerald-500/30">
          <div className="flex items-center space-x-2.5 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Privacy & Control Policy</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            “ThreadBack only uses work information you choose to share or connect.”
          </p>
          <p className="text-xs text-dark-400 leading-relaxed mt-1.5">
            ThreadBack does NOT secretly record keystrokes, screen recordings, or background system activities. Work memories are generated solely from session notes and connected repository webhooks.
          </p>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="px-4 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-medium text-pink-400 border border-dark-750 hover:border-pink-500/40 transition-colors flex items-center space-x-2"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Demo Seed Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-neon-purple shadow-sm transition-all duration-200 flex items-center space-x-2"
          >
            {isSaved ? <Check className="w-4 h-4 text-white" /> : <Settings className="w-4 h-4" />}
            <span>{isSaved ? 'Settings Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
