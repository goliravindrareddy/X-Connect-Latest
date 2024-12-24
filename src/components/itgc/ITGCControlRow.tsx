import React from 'react';
import type { EntityDetails } from '../../types/entity';
import type { ControlActivity } from '../../types/risk-matrix';

interface ITGCControlRowProps {
  control: ControlActivity;
  applications: EntityDetails[];
  mappings: Record<string, boolean>;
  onUpdateMapping: (appId: string, type: 'app' | 'os' | 'db', value: boolean) => void;
}

export function ITGCControlRow({ control, applications, mappings, onUpdateMapping }: ITGCControlRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {control.caNumber}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {control.description}
      </td>
      {applications.map(app => (
        <td key={app.id} className="px-6 py-4">
          <div className="flex justify-center space-x-4">
            <input
              type="checkbox"
              checked={mappings[`${app.id}-app`] || false}
              onChange={(e) => onUpdateMapping(app.id, 'app', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
            />
            <input
              type="checkbox"
              checked={mappings[`${app.id}-os`] || false}
              onChange={(e) => onUpdateMapping(app.id, 'os', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
            />
            <input
              type="checkbox"
              checked={mappings[`${app.id}-db`] || false}
              onChange={(e) => onUpdateMapping(app.id, 'db', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
            />
          </div>
        </td>
      ))}
    </tr>
  );
}