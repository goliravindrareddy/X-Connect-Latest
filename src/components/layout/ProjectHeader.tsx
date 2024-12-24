import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { ProjectScope } from '../../types/project';

export function ProjectHeader() {
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  
  if (!selectedProject) return null;

  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {selectedProject.groupName}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full
              ${selectedProject.status === 'active' ? 'bg-green-100 text-green-800' :
                selectedProject.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'}`}>
              {selectedProject.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}