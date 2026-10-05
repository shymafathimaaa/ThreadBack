import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Square, 
  Plus, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  Zap,
  Tag,
  ChevronRight
} from 'lucide-react';
import { WorkSession, SessionNote } from '../types';

interface ActiveSessionViewProps {
  session: WorkSession;
  onAddNote: (text: string, category?: string) => Promise<void>;
  onEndSessionClick: () => void;
}

export const ActiveSessionView: React.FC<ActiveSessionViewProps> = ({
  session,
  onAddNote,
  onEndSessionClick
}) => {
  const [noteText, setNoteText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'progress' | 'decision' | 'blocker' | 'general'>('progress');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live timer
  useEffect(() => {
    const startMs = new Date(session.startTime).getTime();
    const updateTimer = () => {
      const now = Date.now();
      setElapsedSeconds(Math.max(0, Math.floor((now - startMs) / 1000)));
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [session.startTime]);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNoteSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!noteText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onAddNote(noteText.trim(), selectedCategory);
      setNoteText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo suggestions for rapid testing
  const demoSnippets = [
    { text: 'Finished employee form UI and validation schemas', cat: 'progress' as const },
    { text: 'Decided to use Zod for client/server schema validation', cat: 'decision' as const },
    { text: 'POST /api/employees returns 401 Unauthorized', cat: 'blocker' as const },
    { text: 'Need to inspect JWT auth middleware and headers', cat: 'progress' as const }
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-b from-dark-850 via-dark-850 to-dark-900 border border-cyan-500/40 shadow-neon-cyan p-5 sm:p-6 mb-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-dark-750">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Active Session
              </span>
              <span className="text-dark-600">•</span>
              <span className="text-xs font-semibold text-white">{session.projectName}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {session.task}
            </h2>
            {session.goal && (
              <p className="text-xs text-dark-400">Goal: {session.goal}</p>
            )}
          </div>
        </div>

        {/* Live Timer & End Session Action */}
        <div className="flex items-center space-x-3.5">
          <div className="px-3.5 py-2 rounded-xl bg-dark-900 border border-dark-700/80 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span className="font-mono text-sm font-bold text-cyan-300 tracking-wider">
              {formatTimer(elapsedSeconds)}
            </span>
          </div>

          <button
            onClick={onEndSessionClick}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold shadow-sm transition-all duration-200 flex items-center space-x-1.5 hover:scale-105 active:scale-95"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* Main Body: Live Note Feed & Input */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Notes History */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-dark-200 flex items-center space-x-1.5">
              <span>Session Log</span>
              <span className="text-[10px] font-mono text-dark-400 bg-dark-800 px-1.5 py-0.2 rounded">
                {session.notes.length} notes
              </span>
            </div>
            <span className="text-[11px] text-dark-400">Notes fuel the AI Work Memory</span>
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1 mb-4">
            {session.notes.length === 0 ? (
              <div className="p-4 rounded-xl bg-dark-900/60 border border-dark-800 text-center text-xs text-dark-400">
                No notes added yet. Jot down progress, decisions, or errors as you work!
              </div>
            ) : (
              session.notes.map(n => {
                const isBlocker = n.category === 'blocker' || /error|block|fail|401|403|bug/i.test(n.text);
                const isDecision = n.category === 'decision' || /decid|chose|use zod|standard/i.test(n.text);
                return (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border flex items-start space-x-2.5 text-xs transition-colors ${
                      isBlocker 
                        ? 'bg-pink-950/20 border-pink-500/30 text-pink-200' 
                        : isDecision 
                        ? 'bg-purple-950/20 border-purple-500/30 text-purple-200' 
                        : 'bg-dark-900/80 border-dark-750 text-slate-200'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isBlocker ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-pink-400" />
                      ) : isDecision ? (
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium leading-relaxed">{n.text}</p>
                    </div>
                    <span className="text-[10px] font-mono text-dark-400 shrink-0">
                      {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Note Input Form */}
          <form onSubmit={handleNoteSubmit} className="space-y-2">
            <div className="flex items-center space-x-2">
              {(['progress', 'decision', 'blocker'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-colors flex items-center space-x-1 ${
                    selectedCategory === cat
                      ? cat === 'blocker' 
                        ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' 
                        : cat === 'decision'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-dark-800 text-dark-400 hover:text-white border border-transparent'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Type quick update (e.g. 'Finished form validation', '401 on POST')..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-dark-900 border border-dark-700 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!noteText.trim() || isSubmitting}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Quick Demo / Helper Prompts */}
        <div className="p-4 rounded-xl bg-dark-900/60 border border-dark-750 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-purple-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick Log Snippets (Hackathon Demo)</span>
            </div>
            <p className="text-[11px] text-dark-400 mb-3">
              Click any realistic note to simulate rapid session logging:
            </p>

            <div className="space-y-1.5">
              {demoSnippets.map((snippet, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(snippet.cat);
                    onAddNote(snippet.text, snippet.cat);
                  }}
                  className="w-full text-left p-2 rounded-lg bg-dark-850 hover:bg-dark-800 border border-dark-750 text-xs text-dark-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{snippet.text}</span>
                  <ChevronRight className="w-3 h-3 text-dark-400 group-hover:text-cyan-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-750/70 text-[11px] text-dark-400">
            Tip: When you click <strong className="text-pink-400">End Session</strong>, ThreadBack will reconstruct decisions, blockers, and next steps automatically.
          </div>
        </div>
      </div>
    </div>
  );
};
