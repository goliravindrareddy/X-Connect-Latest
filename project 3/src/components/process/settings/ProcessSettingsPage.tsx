import React from 'react';
import { Save } from 'lucide-react';
import { ProcessControlsTable } from './ProcessControlsTable';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import type { ProcessControl } from '../../../types/process';
import type { ProjectScope } from '../../../types/project';
import type { ControlObjective } from '../../../types/risk-matrix';

export function ProcessSettingsPage() {
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  const [processControls, setProcessControls] = useLocalStorage<ProcessControl[]>('process-controls', []);
  const [riskMatrixData] = useLocalStorage<ControlObjective[]>(`soc1-objectives-${selectedProjectId}`, []);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectControls = processControls.filter(control => control.projectId === selectedProjectId);

  // Get Process controls from risk matrix
  const processMatrixControls = riskMatrixData
    .filter(obj => obj.testingType === 'Process')
    .flatMap(obj => obj.controlActivities);

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a project to view Process settings
        </h2>
      </div>
    );
  }

  const handleSave = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Changes saved successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Process Settings</h1>
          <p className="text-gray-600 mt-1">Configure process controls and testing approach</p>
          <div className="mt-2">
            <span className="font-medium">Selected Project: </span>
            <span className="text-gray-700">{selectedProject.groupName} - {selectedProject.reportName}</span>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>

      <ProcessControlsTable
        controls={processMatrixControls}
        processControls={projectControls}
        onUpdateControls={setProcessControls}
      />
    </div>
  );
}