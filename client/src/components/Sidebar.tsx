import React from 'react';
import { 
  Home, 
  FolderKanban, 
  BrainCircuit, 
  LineChart, 
  Settings, 
  Sparkles, 
  PlusCircle, 
  ExternalLink,
  ShieldCheck,
  Play
} from 'lucide-react';
import { NavigationTab, WorkSession } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  activeSession: WorkSession | null;
  onOpenNewProject: () => void;
  onOpenStartSession: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  activeSession,
  onOpenNewProject,
  onOpenStartSession
}) => {
  const navItems: Array<{ id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'memory', label: 'Work Memory', icon: BrainCircuit },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between bg-dark-900 border-r border-dark-750/70 p-4 select-none z-30">
      {/* Top Header & Logo */}
      <div>
        <div className="flex items-center justify-between px-2 py-3 mb-6">
          <div 
            onClick={() => onTabChange('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-cyan-400 p-[1.5px] shadow-neon-purple/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base text-white tracking-tight">ThreadBack</span>
                <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded-full font-semibold">AI</span>
              </div>
              <p className="text-[11px] text-dark-400 tracking-tight font-medium">Never restart from zero</p>
            </div>
          </div>
        </div>

        {/* Quick Action Start Session Button */}
        <div className="mb-6 px-1">
          {activeSession ? (
            <div 
              onClick={() => onTabChange('home')}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-950/70 to-cyan-950/70 border border-purple-500/40 shadow-neon-purple/20 shadow-md cursor-pointer hover:border-purple-400 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <div className="truncate">
                  <div className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">Active Session</div>
                  <div className="text-xs text-white font-medium truncate">{activeSession.task}</div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenStartSession}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium text-xs shadow-neon-purple shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 group hover:shadow-purple-500/30"
            >
              <Play className="w-3.5 h-3.5 fill-current text-white/90 group-hover:translate-x-0.5 transition-transform" />
              <span>Start Work Session</span>
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-sm'
                    : 'text-dark-200 hover:text-white hover:bg-dark-850 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-purple-400' : 'text-dark-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-neon-purple" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick New Project CTA */}
        <div className="mt-6 pt-4 border-t border-dark-750/50 px-1">
          <button
            onClick={onOpenNewProject}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-dark-400 hover:text-dark-200 hover:bg-dark-850/60 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>New Project</span>
            </span>
            <span className="text-[10px] font-mono text-dark-400 bg-dark-800 px-1.5 py-0.5 rounded border border-dark-700">+N</span>
          </button>
        </div>
      </div>

      {/* Bottom Profile & Privacy Pill */}
      <div className="space-y-3 pt-4 border-t border-dark-750/70">
        <div 
          onClick={() => onTabChange('landing')}
          className="p-2.5 rounded-xl bg-dark-850/70 border border-dark-750 hover:border-purple-500/30 cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-medium text-dark-200 group-hover:text-white">Landing Page</span>
          </div>
          <ExternalLink className="w-3 h-3 text-dark-400 group-hover:text-purple-400" />
        </div>

        <div className="flex items-center justify-between px-2 py-1 text-[11px] text-dark-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">Privacy First Engine</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/80">v1.0-MVP</span>
        </div>

        {/* User Card */}
        <div 
          onClick={() => onTabChange('settings')}
          className="flex items-center space-x-3 p-2 rounded-xl bg-dark-850/40 hover:bg-dark-850 border border-dark-800/80 hover:border-dark-700 cursor-pointer transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/40 to-cyan-500/40 border border-purple-400/30 flex items-center justify-center font-bold text-xs text-white">
            SF
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">Shyma Fathima</div>
            <div className="text-[10px] text-dark-400 truncate">AI Continuity Pro</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
