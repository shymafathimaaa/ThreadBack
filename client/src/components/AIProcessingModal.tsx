import React, { useState, useEffect } from 'react';
import { BrainCircuit, Check, Sparkles, Cpu, Layers, Compass } from 'lucide-react';

interface AIProcessingModalProps {
  isOpen: boolean;
  projectName: string;
}

export const AIProcessingModal: React.FC<AIProcessingModalProps> = ({
  isOpen,
  projectName
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: 'Parsing session notes & milestone timestamps', icon: Cpu },
    { label: 'Distilling completed features & schema decisions', icon: Layers },
    { label: 'Isolating blockers & root cause diagnostics', icon: BrainCircuit },
    { label: 'Synthesizing zero-friction next action', icon: Compass },
  ];

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      return;
    }

    const timer1 = setTimeout(() => setStepIndex(1), 500);
    const timer2 = setTimeout(() => setStepIndex(2), 1100);
    const timer3 = setTimeout(() => setStepIndex(3), 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-dark-900 border border-purple-500/40 p-8 text-center shadow-2xl shadow-purple-950/60 relative overflow-hidden">
        {/* Subtle pulsating glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        
        {/* Radar Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping" />
          <div className="absolute inset-1 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin" />
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 p-[2px] shadow-neon-purple">
            <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center">
              <BrainCircuit className="w-8 h-8 text-cyan-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">
          Reconstructing your work context...
        </h3>
        <p className="text-xs text-dark-400 mb-6">
          ThreadBack is translating raw session activity for <span className="text-purple-300 font-semibold">{projectName}</span> into persistent Work Memory.
        </p>

        {/* Step Progress Checklist */}
        <div className="space-y-2.5 text-left bg-dark-850/80 border border-dark-750 p-4 rounded-xl">
          {steps.map((step, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            const Icon = step.icon;

            return (
              <div 
                key={idx}
                className={`flex items-center space-x-3 text-xs transition-all duration-300 ${
                  isDone 
                    ? 'text-emerald-300 font-medium' 
                    : isCurrent 
                    ? 'text-cyan-300 font-semibold scale-[1.01]' 
                    : 'text-dark-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                  isDone 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : isCurrent 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' 
                    : 'bg-dark-800 text-dark-600 border border-dark-750'
                }`}>
                  {isDone ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                </div>
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Brand Tagline */}
        <div className="mt-6 flex items-center justify-center space-x-1.5 text-[11px] text-dark-400">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>“Never restart from zero.”</span>
        </div>
      </div>
    </div>
  );
};
