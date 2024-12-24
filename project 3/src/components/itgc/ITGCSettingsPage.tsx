import React from 'react';
import { Save } from 'lucide-react';
import { ITGCControlsTable } from './ITGCControlsTable';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateITGCRequests } from '../../utils/itgcRequestGenerator';
import type { EntityDetails } from '../../types/entity';
import type { ControlObjective } from '../../types/risk-matrix';
import type { ProjectScope } from '../../types/project';
import type { ITGCRequest } from '../../types/itgc-request';

export function ITGCSettingsPage() {
  const [entities] = useLocalStorage<EntityDetails[]>('entities', []);
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  const [controlMappings, setControlMappings] = useLocalStorage<Record<string, Record<string, boolean>>>('itgc-mappings', {});
  const [requests, setRequests] = useLocalStorage<ITGCRequest[]>('itgc-requests', []);
  
  // Get the selected project
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  
  // Filter entities for the current project and get those with ITGC required
  const projectEntities = entities.filter(e => e.projectId === selectedProjectId);
  const itgcRequiredApplications = projectEntities.filter(entity => entity.itgcRequired);
  
  // Get ITGC controls from risk matrix
  const [riskMatrixData] = useLocalStorage<ControlObjective[]>(
    `soc1-objectives-${selectedProjectId}`,
    []
  );

  // Get ITGC controls from risk matrix
  const itgcControls = riskMatrixData
    .filter(obj => obj.testingType === 'ITGC')
    .flatMap(obj => obj.controlActivities);

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a project from the Projects page to view ITGC settings
        </h2>
      </div>
    );
  }

  if (projectEntities.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          No entities found for this project
        </h2>
        <p className="mt-2 text-gray-600">
          Please add entities in the Entity Details page
        </p>
      </div>
    );
  }

  if (itgcRequiredApplications.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          No applications with ITGC requirements found
        </h2>
        <p className="mt-2 text-gray-600">
          Please mark applications as ITGC required in the Entity Details page
        </p>
      </div>
    );
  }

  if (itgcControls.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          No ITGC controls found
        </h2>
        <p className="mt-2 text-gray-600">
          Please add ITGC controls in the Risk Matrix page
        </p>
      </div>
    );
  }

  const handleSave = () => {
    if (!selectedProjectId || !selectedProject || selectedProject.phases.length === 0) {
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg';
      notification.textContent = 'Project phases are required to generate requests';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      return;
    }

    // Generate new requests based on current mappings
    const newRequests = generateITGCRequests(
      selectedProjectId,
      itgcRequiredApplications,
      itgcControls,
      controlMappings,
      selectedProject.phases
    );

    // Remove old requests for this project and add new ones
    const otherProjectRequests = requests.filter(r => r.projectId !== selectedProjectId);
    setRequests([...otherProjectRequests, ...newRequests]);

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Changes saved and requests generated successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ITGC Settings</h1>
          <p className="text-gray-600 mt-1">Configure ITGC controls for applications</p>
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

      <ITGCControlsTable
        itgcControls={itgcControls}
        applications={itgcRequiredApplications}
        controlMappings={controlMappings}
        onUpdateMappings={setControlMappings}
      />
    </div>
  );
}