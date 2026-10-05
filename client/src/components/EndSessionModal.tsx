import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, FileText, ArrowRight } from 'lucide-react';
import { WorkSession } from '../types';

interface EndSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: WorkSession;
  onGenerateMemory: (reflections: {
    accomplished?: string;
    stoppedWhy?: string;
    rememberNote?: string;
    rawNotes?: string;
  }) => void;
}

export const EndSessionModal: React.FC<EndSessionModalProps> = ({
  isOpen,
  onClose,
  session,
  onGenerateMemory
}) => {
  // Extract hints from existing notes
  const notesText = session.notes.map(n => n.text).join(' ');
  const defaultAccomplished = session.notes.find(n => /finish|complet|built|done/i.test(n.text))?.text || '';
  const defaultStopped = session.notes.find(n => /error|block|401|403|fail|bug/i.test(n.text))?.text || '';

  const [accomplished, setAccomplished] = useState(defaultAccomplished);
  const [stoppedWhy, setStoppedWhy] = useState(defaultStopped);
  const [rememberNote, setRememberNote] = useState('');
  const [rawNotes, setRawNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateMemory({
      accomplished: accomplished.trim() || undefined,
      stoppedWhy: stoppedWhy.trim() || undefined,
      rememberNote: rememberNote.trim() || undefined,
      rawNotes: rawNotes.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-xl rounded-2xl bg-dark-900 border border-purple-500/40 shadow-2xl shadow-purple-950/50 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-750 bg-gradient-to-r from-dark-850 via-dark-850 to-purple-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Before you leave...</h3>
              <p className="text-xs text-dark-400">
                Lock in your context for <span className="text-purple-300 font-semibold">{session.projectName}</span>
              </p>
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
          {/* Accomplished */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>What did you accomplish?</span>
            </label>
            <input
              type="text"
              value={accomplished}
              onChange={e => setAccomplished(e.target.value)}
              placeholder="e.g. Employee form UI and schema validation"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-emerald-400 transition-colors"
              autoFocus
            />
          </div>

          {/* What stopped you */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1.5 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>What stopped you? (Blocker or end of session)</span>
            </label>
            <input
              type="text"
              value={stoppedWhy}
              onChange={e => setStoppedWhy(e.target.value)}
              placeholder="e.g. 401 authentication error / end of day"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-pink-400 transition-colors"
            />
          </div>

          {/* Anything important to remember */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Anything important to remember?</span>
            </label>
            <input
              type="text"
              value={rememberNote}
              onChange={e => setRememberNote(e.target.value)}
              placeholder="e.g. Need to verify JWT middleware token parser in auth.ts"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Optional raw extra thoughts */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Raw notes / stream of consciousness (optional)</span>
            </label>
            <textarea
              value={rawNotes}
              onChange={e => setRawNotes(e.target.value)}
              rows={2}
              placeholder="Jot down messy thoughts, ideas, or links..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-dark-750 flex items-center justify-between">
            <div className="text-[11px] text-dark-400">
              AI will synthesize this into a structured Work Snapshot.
            </div>
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-xs font-medium text-dark-200 transition-colors"
              >
                Back to Session
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-neon-purple shadow-md transition-all duration-200 flex items-center space-x-2 group hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Work Memory</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
