import React, { useState } from 'react';
import { ProcessRequestsTable } from './ProcessRequestsTable';
import { ProcessRequestsToolbar } from './ProcessRequestsToolbar';
import { ProcessRequestsDashboard } from './ProcessRequestsDashboard';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { generateProcessRequests } from '../../../utils/processRequestGenerator';
import { exportToExcel } from '../../../utils/exportUtils';
import type { ProcessRequest } from '../../../types/process';
import type { ProjectScope } from '../../../types/project';
import type { ControlObjective } from '../../../types/risk-matrix';

export function ProcessRequestsPage() {
  const [requests, setRequests] = useLocalStorage<ProcessRequest[]>('process-requests', []);
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const [projects] = useLocalStorage<ProjectScope[]>('projects', []);
  const [riskMatrixData] = useLocalStorage<ControlObjective[]>(`soc1-objectives-${selectedProjectId}`, []);
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
  
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectRequests = requests.filter(request => request.projectId === selectedProjectId);

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a project to view Process requests
        </h2>
      </div>
    );
  }

  const handleGenerateRequests = () => {
    const processControls = riskMatrixData
      .filter(obj => obj.testingType === 'Process')
      .flatMap(obj => obj.controlActivities);

    const newRequests = generateProcessRequests(
      selectedProjectId,
      processControls,
      selectedProject.phases
    );

    // Remove old requests for this project and add new ones
    const otherProjectRequests = requests.filter(r => r.projectId !== selectedProjectId);
    setRequests([...otherProjectRequests, ...newRequests]);

    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Process requests generated successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleUpdateRequest = (updatedRequest: ProcessRequest) => {
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
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
    notification.textContent = 'Request saved successfully';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleSaveAll = () => {
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
        <h1 className="text-2xl font-bold text-gray-900">Process Requests</h1>
        <p className="text-gray-600 mt-1">Manage process control testing requests and documentation</p>
      </div>

      <ProcessRequestsDashboard requests={projectRequests} />

      <ProcessRequestsToolbar
        onGenerateRequests={handleGenerateRequests}
        onSaveAll={handleSaveAll}
        onExportSelected={() => exportToExcel(
          projectRequests.filter(r => selectedRequests.has(r.id))
        )}
        onExportAll={() => exportToExcel(projectRequests)}
        selectedCount={selectedRequests.size}
        totalCount={projectRequests.length}
      />

      <ProcessRequestsTable
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