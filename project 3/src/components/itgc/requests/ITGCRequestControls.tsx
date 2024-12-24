import React from 'react';
import type { EntityDetails } from '../../../types/entity';
import type { ControlActivity } from '../../../types/risk-matrix';

interface ITGCRequestControlsProps {
  applications: EntityDetails[];
  controls: ControlActivity[];
  selectedApp?: string;
  selectedCA?: string;
  selectedElement?: string;
  onAppChange: (app: string) => void;
  onCAChange: (ca: string) => void;
  onElementChange: (element: string) => void;
}

export function ITGCRequestControls({
  applications,
  controls,
  selectedApp,
  selectedCA,
  selectedElement,
  onAppChange,
  onCAChange,
  onElementChange
}: ITGCRequestControlsProps) {
  const filteredControls = selectedApp
    ? controls.filter(c => c.applicationName === selectedApp)
    : [];

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <select
          value={selectedApp || ''}
          onChange={(e) => onAppChange(e.target.value)}
          className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded"
        >
          <option value="">Select Application</option>
          {applications.map(app => (
            <option key={app.id} value={app.applicationName}>
              {app.applicationName}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <select
          value={selectedCA || ''}
          onChange={(e) => onCAChange(e.target.value)}
          className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded"
          disabled={!selectedApp}
        >
          <option value="">Select Control Activity</option>
          {filteredControls.map(control => (
            <option key={control.id} value={control.caNumber}>
              {control.caNumber}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <select
          value={selectedElement || ''}
          onChange={(e) => onElementChange(e.target.value)}
          className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded"
          disabled={!selectedCA}
        >
          <option value="">Select IT Element</option>
          <option value="Application">Application</option>
          <option value="Operating System">Operating System</option>
          <option value="Database">Database</option>
        </select>
      </div>
    </div>
  );
}