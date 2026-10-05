import React, { useState } from 'react';
import { X, Plus, FolderPlus, Sparkles, Target, AlignLeft } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (data: { name: string; description: string; goal: string; color?: string; tags?: string[] }) => Promise<void>;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [color, setColor] = useState('#A855F7');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCreateProject({
        name: name.trim(),
        description: description.trim(),
        goal: goal.trim(),
        color,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : ['Project']
      });
      setName('');
      setDescription('');
      setGoal('');
      setTags('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const colorOptions = [
    { label: 'Neon Purple', val: '#A855F7' },
    { label: 'Neon Cyan', val: '#06B6D4' },
    { label: 'Neon Rose', val: '#F43F5E' },
    { label: 'Neon Emerald', val: '#10B981' },
    { label: 'Neon Amber', val: '#F59E0B' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg rounded-2xl bg-dark-900 border border-purple-500/30 shadow-2xl shadow-purple-950/40 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-750 bg-dark-850/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create New Project</h3>
              <p className="text-xs text-dark-400">Set up a space for your code, research, or product</p>
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
          {/* Project Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <span>Project Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. DocuSynth, DevPulse, OmniRoute"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-dark-400" />
              <span>Description</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Short description of the system or goal"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5 flex items-center space-x-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Primary Goal / Objective</span>
            </label>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="e.g. Build MVP for hackathon demo submission"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Color & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5">
                Accent Theme
              </label>
              <div className="flex items-center space-x-2">
                {colorOptions.map(c => (
                  <button
                    key={c.val}
                    type="button"
                    onClick={() => setColor(c.val)}
                    className={`w-7 h-7 rounded-lg transition-transform ${
                      color === c.val ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-dark-900' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.val }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-200 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="React, AI, Python"
                className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
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
              disabled={!name.trim() || isSubmitting}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-neon-purple shadow-sm transition-all duration-200 disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating...' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
