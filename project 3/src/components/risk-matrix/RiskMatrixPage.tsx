import React from 'react';
import { Save } from 'lucide-react';
import { RiskMatrixTable } from './RiskMatrixTable';
import type { ProjectScope } from '../../types/project';

interface RiskMatrixPageProps {
  selectedProject?: ProjectScope;
}

export function RiskMatrixPage({ selectedProject }: RiskMatrixPageProps) {
  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a project from the Projects page to view its risk matrix
        </h2>
      </div>
    );
  }

  const handleSave = () => {
    // The data is already being saved automatically through useLocalStorage
    // This is just to provide user feedback
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Changes saved successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{selectedProject.groupName}</h1>
            <span className="text-gray-500">|</span>
            <p className="text-gray-600">{selectedProject.reportName}</p>
          </div>
          <p className="text-gray-600 mt-2">
            {selectedProject.auditType.socType} Type {selectedProject.auditType.reportType} Risk Assessment Matrix
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
      
      <RiskMatrixTable 
        socType={selectedProject.auditType.socType} 
        projectId={selectedProject.id}
      />
    </div>
  );
}