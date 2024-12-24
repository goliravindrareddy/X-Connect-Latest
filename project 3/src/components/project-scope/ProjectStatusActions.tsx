import React, { useState } from 'react';
import { MoreVertical, Edit, Power, Trash2 } from 'lucide-react';
import type { ProjectScope } from '../../types/project';

interface ProjectStatusActionsProps {
  project: ProjectScope;
  onUpdate: (project: ProjectScope) => void;
  onDelete: (id: string) => void;
}

export function ProjectStatusActions({ project, onUpdate, onDelete }: ProjectStatusActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditStatus, setShowEditStatus] = useState(false);

  const handleStatusChange = (status: ProjectScope['status']) => {
    onUpdate({ ...project, status });
    setShowEditStatus(false);
  };

  const handleDisable = () => {
    onUpdate({ ...project, status: 'on-hold' });
    setShowDropdown(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onDelete(project.id);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2
          ${project.status === 'active' ? 'bg-green-100 text-green-800' :
            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'}`}>
          {project.status}
        </span>
        
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setShowEditStatus(true);
                setShowDropdown(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Status
            </button>
            <button
              onClick={handleDisable}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Power className="h-4 w-4 mr-2" />
              {project.status === 'on-hold' ? 'Enable' : 'Disable'}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}

      {showEditStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Update Project Status</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleStatusChange('active')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              >
                Active
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              >
                Completed
              </button>
              <button
                onClick={() => handleStatusChange('on-hold')}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              >
                On Hold
              </button>
            </div>
            <button
              onClick={() => setShowEditStatus(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}