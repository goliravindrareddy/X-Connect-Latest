import React from 'react';
import { Plus } from 'lucide-react';
import { ProjectActions } from './ProjectActions';
import type { ProjectScope } from '../../types/project';

interface ProjectListProps {
  projects: ProjectScope[];
  onAddProject: () => void;
  onProjectSelect: (project: ProjectScope) => void;
  onEntityClick: (projectId: string) => void;
  selectedProjectId?: string;
}

export function ProjectList({ 
  projects, 
  onAddProject, 
  onProjectSelect,
  onEntityClick,
  selectedProjectId 
}: ProjectListProps) {
  const handleUpdateProject = (updatedProject: ProjectScope) => {
    const updatedProjects = projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    window.location.reload();
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <button
          onClick={onAddProject}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group Entity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Audit Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Issuance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr 
                key={project.id} 
                className={`hover:bg-gray-50 ${
                  project.id === selectedProjectId ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onEntityClick(project.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {project.groupName}
                  </button>
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                  onClick={() => onProjectSelect(project)}
                >
                  {project.reportName}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                  onClick={() => onProjectSelect(project)}
                >
                  {project.auditType.socType} - {project.auditType.reportType}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                  onClick={() => onProjectSelect(project)}
                >
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                  onClick={() => onProjectSelect(project)}
                >
                  {project.reportIssuanceDate ? new Date(project.reportIssuanceDate).toLocaleDateString() : 'Not set'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProjectActions
                    project={project}
                    onUpdate={handleUpdateProject}
                    onDelete={handleDeleteProject}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}