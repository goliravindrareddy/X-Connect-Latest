import React, { useState } from 'react';
import { ProjectList } from './components/project-scope/ProjectList';
import { ProjectScopeForm } from './components/project-scope/ProjectScopeForm';
import { RiskMatrixPage } from './components/risk-matrix/RiskMatrixPage';
import { EntityDetailsPage } from './components/entity/EntityDetailsPage';
import { ITGCSettingsPage } from './components/itgc/ITGCSettingsPage';
import { ITGCRequestsPage } from './components/itgc/requests/ITGCRequestsPage';
import { ProcessSettingsPage } from './components/process/settings/ProcessSettingsPage';
import { ProcessRequestsPage } from './components/process/requests/ProcessRequestsPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { Sidebar } from './components/layout/Sidebar';
import { ProjectHeader } from './components/layout/ProjectHeader';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { ProjectScope } from './types/project';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useLocalStorage<ProjectScope[]>('projects', []);
  const [currentPage, setCurrentPage] = useState<'projects' | 'dashboard' | 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests' | 'process-settings' | 'process-requests'>('projects');
  const [selectedProjectId, setSelectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage('sidebar-collapsed', false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleSaveProject = (project: ProjectScope) => {
    setProjects([...projects, project]);
    setShowForm(false);
  };

  const handleProjectSelect = (project: ProjectScope) => {
    setSelectedProjectId(project.id);
    setCurrentPage('dashboard');
  };

  const handleEntityClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('entities');
  };

  const handlePageChange = (page: 'projects' | 'dashboard' | 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests' | 'process-settings' | 'process-requests') => {
    if ((page !== 'projects' && !selectedProject)) {
      setCurrentPage('projects');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 overflow-x-auto">
        {selectedProjectId && currentPage !== 'projects' && <ProjectHeader />}
        <div className="container mx-auto py-8">
          {currentPage === 'projects' ? (
            showForm ? (
              <ProjectScopeForm 
                onSave={handleSaveProject} 
                onCancel={() => setShowForm(false)} 
              />
            ) : (
              <ProjectList 
                projects={projects} 
                onAddProject={() => setShowForm(true)}
                onProjectSelect={handleProjectSelect}
                onEntityClick={handleEntityClick}
                selectedProjectId={selectedProjectId}
              />
            )
          ) : currentPage === 'dashboard' ? (
            <DashboardPage />
          ) : currentPage === 'entities' ? (
            <EntityDetailsPage />
          ) : currentPage === 'risk-matrix' ? (
            <RiskMatrixPage selectedProject={selectedProject} />
          ) : currentPage === 'itgc-settings' ? (
            <ITGCSettingsPage />
          ) : currentPage === 'itgc-requests' ? (
            <ITGCRequestsPage />
          ) : currentPage === 'process-settings' ? (
            <ProcessSettingsPage />
          ) : (
            <ProcessRequestsPage />
          )}
        </div>
      </main>
    </div>
  );
}