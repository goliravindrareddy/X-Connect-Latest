import React, { useState } from 'react';
import { ITGCRequestsTable } from './ITGCRequestsTable';
import { ITGCRequestsToolbar } from './ITGCRequestsToolbar';
import { ITGCRequestsDashboard } from './ITGCRequestsDashboard';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { generateITGCRequests } from '../../../utils/itgcRequestGenerator';
import { exportToExcel } from '../../../utils/exportUtils';
import type { ITGCRequest } from '../../../types/itgc-request';
import type { ProjectScope } from '../../../types/project';
import type { EntityDetails } from '../../../types/entity';
import type { ControlObjective } from '../../../types/risk-matrix';

export function ITGCRequestsPage() {
  const [requests, setRequests] = useLocalStorage<ITGCRequest[]>('itgc-requests', []);
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  const [entities] = useLocalStorage<EntityDetails[]>('entities', []);
  const [controlMappings] = useLocalStorage<Record<string, Record<string, boolean>>>('itgc-mappings', {});
  const [riskMatrixData] = useLocalStorage<ControlObjective[]>(`soc1-objectives-${selectedProjectId}`, []);
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectRequests = requests.filter(request => request.projectId === selectedProjectId);

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a project to view ITGC requests
        </h2>
      </div>
    );
  }

  const handleGenerateRequests = () => {
    const projectEntities = entities.filter(e => e.projectId === selectedProjectId);
    const itgcRequiredApplications = projectEntities.filter(entity => entity.itgcRequired);
    const itgcControls = riskMatrixData
      .filter(obj => obj.testingType === 'ITGC')
      .flatMap(obj => obj.controlActivities);

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
    notification.textContent = 'ITGC requests generated successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleUpdateRequest = (updatedRequest: ITGCRequest) => {
    setRequests(requests.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request
    ));
  };

  const handleDeleteRequest = (id: string) => {
    setRequests(requests.filter(request => request.id !== id));
    setSelectedRequests(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSaveRequest = (id: string) => {
    // In a real app, this would save to the backend
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Request saved successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleSaveAll = () => {
    // In a real app, this would save all changes to the backend
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'All changes saved successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleSelectRequest = (id: string, selected: boolean) => {
    setSelectedRequests(prev => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRequests(new Set(projectRequests.map(r => r.id)));
    } else {
      setSelectedRequests(new Set());
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ITGC Requests</h1>
        <p className="text-gray-600 mt-1">Manage ITGC requests and documentation</p>
      </div>

      <ITGCRequestsDashboard requests={projectRequests} />

      <ITGCRequestsToolbar
        onGenerateRequests={handleGenerateRequests}
        onSaveAll={handleSaveAll}
        onExportSelected={() => exportToExcel(
          projectRequests.filter(r => selectedRequests.has(r.id))
        )}
        onExportAll={() => exportToExcel(projectRequests)}
        selectedCount={selectedRequests.size}
        totalCount={projectRequests.length}
      />

      <ITGCRequestsTable
        requests={projectRequests}
        selectedRequests={selectedRequests}
        onUpdateRequest={handleUpdateRequest}
        onDeleteRequest={handleDeleteRequest}
        onSaveRequest={handleSaveRequest}
        onSelectRequest={handleSelectRequest}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}