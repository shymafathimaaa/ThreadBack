import React, { useState } from 'react';
import { Search, BrainCircuit, Filter, Sparkles, Folder } from 'lucide-react';
import { WorkSnapshot, Project } from '../types';
import { MemoryCard } from '../components/MemoryCard';

interface WorkMemoryPageProps {
  memories: WorkSnapshot[];
  projects: Project[];
  onViewSnapshotDetails: (snapshot: WorkSnapshot) => void;
  onResumeMemory: (snapshot: WorkSnapshot) => void;
}

export const WorkMemoryPage: React.FC<WorkMemoryPageProps> = ({
  memories,
  projects,
  onViewSnapshotDetails,
  onResumeMemory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  const filteredMemories = memories.filter(m => {
    const matchesProject = selectedProjectId === 'all' || m.projectId === selectedProjectId;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      m.projectName.toLowerCase().includes(q) ||
      m.task.toLowerCase().includes(q) ||
      m.completed.toLowerCase().includes(q) ||
      m.decision.toLowerCase().includes(q) ||
      m.blocker.toLowerCase().includes(q) ||
      m.nextAction.toLowerCase().includes(q);

    return matchesProject && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-dark-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Continuity Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Work Memory
          </h1>
          <p className="text-sm text-dark-400 mt-0.5">
            Every work session distilled into decisions, blockers, and next actions.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1.5 rounded-xl">
          {memories.length} Snapshots Saved
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-2xl bg-dark-850/80 border border-dark-750 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-4 h-4 text-dark-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search decisions, blockers, completed tasks..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-dark-900 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-dark-400 flex items-center space-x-1 mr-1">
            <Folder className="w-3.5 h-3.5 text-purple-400" />
            <span>Filter Project:</span>
          </span>
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-dark-900 border border-dark-750 text-white text-xs focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="all">All Projects ({memories.length})</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Memories Grid */}
      {filteredMemories.length === 0 ? (
        <div className="rounded-2xl bg-dark-850/60 border border-dark-750 p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No work memories match your criteria</h3>
          <p className="text-xs text-dark-400 mt-1 max-w-sm mx-auto">
            Try clearing filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMemories.map(memory => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onClick={onViewSnapshotDetails}
              onResume={onResumeMemory}
            />
          ))}
        </div>
      )}
    </div>
  );
};
