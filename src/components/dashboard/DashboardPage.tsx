import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { ProjectTimeline } from './ProjectTimeline';
import { RecentActivity } from './RecentActivity';
import { ProjectSelector } from './ProjectSelector';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { ProjectScope } from '../../types/project';

export function DashboardPage() {
  const [selectedProjectId, setSelectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  const [currentPage, setCurrentPage] = useLocalStorage<'projects' | 'dashboard' | 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests'>('currentPage', 'dashboard');
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleProjectSelect = (project: ProjectScope) => {
    setSelectedProjectId(project.id);
  };

  const handleNavigate = (page: 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests') => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ProjectSelector 
        projects={projects}
        selectedProjectId={selectedProjectId}
        onProjectSelect={handleProjectSelect}
      />
      
      <div className="flex-1 overflow-auto">
        {selectedProject ? (
          <div className="p-6 space-y-6">
            <DashboardHeader project={selectedProject} />
            <DashboardStats 
              project={selectedProject} 
              onNavigate={handleNavigate}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectTimeline project={selectedProject} />
              <RecentActivity project={selectedProject} />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to AuditFlow</h2>
              <p className="text-gray-600">Please select a project from the list to view your dashboard.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}