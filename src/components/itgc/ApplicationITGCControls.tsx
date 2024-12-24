import React from 'react';
import type { EntityDetails } from '../../types/entity';
import type { ControlActivity } from '../../types/risk-matrix';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface ApplicationITGCControlsProps {
  application: EntityDetails;
  itgcControls: ControlActivity[];
}

interface ITGCControlMapping {
  controlId: string;
  isAppApplicable: boolean;
  isOSApplicable: boolean;
  isDBApplicable: boolean;
}

interface ApplicationControlMappings {
  applicationId: string;
  controls: ITGCControlMapping[];
}

export function ApplicationITGCControls({ application, itgcControls }: ApplicationITGCControlsProps) {
  const [controlMappings, setControlMappings] = useLocalStorage<ApplicationControlMappings[]>(
    'itgc-control-mappings',
    []
  );

  const currentMappings = controlMappings.find(m => m.applicationId === application.id)?.controls || [];

  const updateMapping = (controlId: string, field: keyof ITGCControlMapping, value: boolean) => {
    const existingAppIndex = controlMappings.findIndex(m => m.applicationId === application.id);
    const newMappings = [...controlMappings];

    if (existingAppIndex === -1) {
      // Create new application mapping
      newMappings.push({
        applicationId: application.id,
        controls: [{
          controlId,
          isAppApplicable: field === 'isAppApplicable' ? value : false,
          isOSApplicable: field === 'isOSApplicable' ? value : false,
          isDBApplicable: field === 'isDBApplicable' ? value : false
        }]
      });
    } else {
      // Update existing application mapping
      const existingControlIndex = newMappings[existingAppIndex].controls
        .findIndex(c => c.controlId === controlId);

      if (existingControlIndex === -1) {
        newMappings[existingAppIndex].controls.push({
          controlId,
          isAppApplicable: field === 'isAppApplicable' ? value : false,
          isOSApplicable: field === 'isOSApplicable' ? value : false,
          isDBApplicable: field === 'isDBApplicable' ? value : false
        });
      } else {
        newMappings[existingAppIndex].controls[existingControlIndex][field] = value;
      }
    }

    setControlMappings(newMappings);
  };

  const getControlMapping = (controlId: string) => 
    currentMappings.find(m => m.controlId === controlId) || {
      controlId,
      isAppApplicable: false,
      isOSApplicable: false,
      isDBApplicable: false
    };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{application.applicationName}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CA No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Control Activity
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                APP
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                OS
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                DB
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {itgcControls.map(control => {
              const mapping = getControlMapping(control.id);
              return (
                <tr key={control.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {control.caNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {control.description}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={mapping.isAppApplicable}
                      onChange={(e) => updateMapping(control.id, 'isAppApplicable', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={mapping.isOSApplicable}
                      onChange={(e) => updateMapping(control.id, 'isOSApplicable', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={mapping.isDBApplicable}
                      onChange={(e) => updateMapping(control.id, 'isDBApplicable', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}