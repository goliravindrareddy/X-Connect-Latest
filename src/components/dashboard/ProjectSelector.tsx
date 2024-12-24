import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { ProjectScope } from '../../types/project';

interface ProjectSelectorProps {
  projects: ProjectScope[];
  selectedProjectId?: string;
  onProjectSelect: (project: ProjectScope) => void;
}

export function ProjectSelector({ projects, selectedProjectId, onProjectSelect }: ProjectSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-20'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {isExpanded ? (
            <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
          ) : (
            <span className="w-full text-center text-gray-400 text-xs uppercase">Projects</span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-all hover:bg-gray-50 relative ${
                project.id === selectedProjectId ? 'bg-blue-50' : ''
              }`}
            >
              <div className={`flex-1 min-w-0 ${!isExpanded ? 'sr-only' : ''}`}>
                <p className="font-medium text-gray-900 truncate">{project.groupName}</p>
                <p className="text-sm text-gray-500 truncate">{project.reportName}</p>
              </div>
              {!isExpanded && (
                <div className="w-full text-center">
                  <span className="w-8 h-8 inline-flex items-center justify-center bg-gray-100 rounded-full">
                    {project.groupName.charAt(0)}
                  </span>
                </div>
              )}
              {project.id === selectedProjectId && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}