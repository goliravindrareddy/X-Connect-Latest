import React from 'react';
import type { EntityDetails } from '../../types/entity';
import type { ControlActivity } from '../../types/risk-matrix';

interface ITGCControlsTableProps {
  itgcControls: ControlActivity[];
  applications: EntityDetails[];
  controlMappings: Record<string, Record<string, boolean>>;
  onUpdateMappings: (mappings: Record<string, Record<string, boolean>>) => void;
}

export function ITGCControlsTable({
  itgcControls,
  applications,
  controlMappings,
  onUpdateMappings
}: ITGCControlsTableProps) {
  const handleMappingChange = (
    controlId: string,
    appId: string,
    type: 'app' | 'os' | 'db',
    value: boolean
  ) => {
    const currentControlMapping = controlMappings[controlId] || {};
    
    const newMappings = {
      ...controlMappings,
      [controlId]: {
        ...currentControlMapping,
        [`${appId}-${type}`]: value
      }
    };
    
    onUpdateMappings(newMappings);
  };

  // Group controls by CA number to handle duplicates
  const groupedControls = itgcControls.reduce((acc, control) => {
    if (!acc[control.caNumber]) {
      acc[control.caNumber] = control;
    }
    return acc;
  }, {} as Record<string, ControlActivity>);

  // Sort controls by CA number
  const sortedControls = Object.values(groupedControls).sort((a, b) => {
    const aNum = parseInt(a.caNumber.replace(/\D/g, ''));
    const bNum = parseInt(b.caNumber.replace(/\D/g, ''));
    return aNum - bNum;
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control Activity</th>
            {applications.map(app => (
              <th key={app.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div>{app.applicationName}</div>
                <div className="flex justify-center space-x-4 mt-2">
                  <span>APP</span>
                  <span>OS</span>
                  <span>DB</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedControls.map(control => (
            <tr key={control.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {control.caNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                <div className="truncate">{control.description}</div>
              </td>
              {applications.map(app => (
                <td key={app.id} className="px-6 py-4">
                  <div className="flex justify-center space-x-4">
                    <input
                      type="checkbox"
                      checked={controlMappings[control.id]?.[`${app.id}-app`] || false}
                      onChange={(e) => handleMappingChange(control.id, app.id, 'app', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <input
                      type="checkbox"
                      checked={controlMappings[control.id]?.[`${app.id}-os`] || false}
                      onChange={(e) => handleMappingChange(control.id, app.id, 'os', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <input
                      type="checkbox"
                      checked={controlMappings[control.id]?.[`${app.id}-db`] || false}
                      onChange={(e) => handleMappingChange(control.id, app.id, 'db', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}