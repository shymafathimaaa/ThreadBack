import React, { useState, useEffect } from 'react';
import { X, Play, Sparkles, Folder, Target, FileText } from 'lucide-react';
import { Project } from '../types';

interface StartSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  preselectedProjectId?: string;
  preselectedTask?: string;
  onStartSession: (data: { projectId: string; task: string; goal: string; notes?: string }) => void;
}

export const StartSessionModal: React.FC<StartSessionModalProps> = ({
  isOpen,
  onClose,
  projects,
  preselectedProjectId,
  preselectedTask,
  onStartSession
}) => {
  const [projectId, setProjectId] = useState(preselectedProjectId || (projects[0]?.id || ''));
  const [task, setTask] = useState(preselectedTask || '');
  const [goal, setGoal] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (preselectedProjectId) setProjectId(preselectedProjectId);
    if (preselectedTask) setTask(preselectedTask);
  }, [preselectedProjectId, preselectedTask]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !task.trim()) return;
    onStartSession({
      projectId,
      task: task.trim(),
      goal: goal.trim(),
      notes: notes.trim() || undefined
    });
    onClose();
  };

  const selectedProject = projects.find(p => p.id === projectId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg rounded-2xl bg-dark-900 border border-purple-500/30 shadow-2xl shadow-purple-950/40 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-750 bg-dark-850/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Start Work Session</h3>
              <p className="text-xs text-dark-400">Lock into focus. ThreadBack tracks your work context.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Project Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <Folder className="w-3.5 h-3.5 text-purple-400" />
              <span>Project</span>
            </label>
            <select
              value={projectId}
              onChange={e => {
                setProjectId(e.target.value);
                const proj = projects.find(p => p.id === e.target.value);
                if (proj && !task) {
                  setTask(proj.currentTask || '');
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs focus:outline-none focus:border-purple-500 transition-colors"
              required
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.currentTask || p.description}
                </option>
              ))}
            </select>
          </div>

          {/* What are you working on? */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>What are you working on?</span>
            </label>
            <input
              type="text"
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="e.g. Employee Management, JWT Auth fix, Dock pickup UI"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-cyan-400 transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Goal for this session */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Goal for this session</span>
            </label>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="e.g. Build employee form UI and connect to backend endpoint"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Optional Initial Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-dark-400" />
              <span>Initial notes / starting context (optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Continuing from yesterday's schema draft..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-dark-750 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-xs font-medium text-dark-200 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!projectId || !task.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-neon-purple shadow-sm transition-all duration-200 disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Session</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
