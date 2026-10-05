import React, { useState } from 'react';
import { Plus, Search, Filter, FolderKanban, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsPageProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onStartSession: (project: Project) => void;
  onOpenNewProject: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onOpenProject,
  onStartSession,
  onOpenNewProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'completed'>('all');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.currentTask.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-dark-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FolderKanban className="w-3.5 h-3.5 text-purple-400" />
            <span>Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-dark-400 mt-0.5">
            Organize work threads, track context states, and jump back in.
          </p>
        </div>

        <button
          onClick={onOpenNewProject}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-neon-purple shadow-sm transition-all duration-200 flex items-center space-x-2 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Controls: Search & Filter */}
      <div className="p-3 rounded-2xl bg-dark-850/80 border border-dark-750 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-dark-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, description, or task..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-dark-900 border border-dark-750 text-white text-xs placeholder-dark-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-dark-400 flex items-center space-x-1 mr-1">
            <Filter className="w-3 h-3" />
            <span>Status:</span>
          </span>
          {(['all', 'active', 'paused', 'completed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm'
                  : 'bg-dark-900 text-dark-400 hover:text-white border border-dark-750'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl bg-dark-850/60 border border-dark-750 p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-400">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="text-xs text-dark-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or create a new project.
          </p>
          <button
            onClick={onOpenNewProject}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenProject={onOpenProject}
              onStartSession={onStartSession}
            />
          ))}
        </div>
      )}
    </div>
  );
};
