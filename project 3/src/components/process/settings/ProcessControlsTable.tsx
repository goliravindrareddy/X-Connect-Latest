import React from 'react';
import type { ProcessControl } from '../../../types/process';
import type { ControlActivity } from '../../../types/risk-matrix';

interface ProcessControlsTableProps {
  controls: ControlActivity[];
  processControls: ProcessControl[];
  onUpdateControls: (controls: ProcessControl[]) => void;
}

const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'] as const;

export function ProcessControlsTable({
  controls,
  processControls,
  onUpdateControls
}: ProcessControlsTableProps) {
  const handleControlUpdate = (caNumber: string, updates: Partial<ProcessControl>) => {
    const existingIndex = processControls.findIndex(c => c.caNumber === caNumber);
    
    if (existingIndex === -1) {
      onUpdateControls([
        ...processControls,
        {
          id: crypto.randomUUID(),
          caNumber,
          ...updates
        } as ProcessControl
      ]);
    } else {
      onUpdateControls(
        processControls.map((control, index) =>
          index === existingIndex
            ? { ...control, ...updates }
            : control
        )
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control Activity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testing Approach</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {controls.map(control => {
            const processControl = processControls.find(pc => pc.caNumber === control.caNumber);
            
            return (
              <tr key={control.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {control.caNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {control.description}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={processControl?.frequency || ''}
                    onChange={(e) => handleControlUpdate(control.caNumber, { frequency: e.target.value as ProcessControl['frequency'] })}
                    className="w-full px-2 py-1 border rounded text-sm"
                  >
                    <option value="">Select Frequency</option>
                    {frequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="1"
                    value={processControl?.sampleSize || ''}
                    onChange={(e) => handleControlUpdate(control.caNumber, { sampleSize: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </td>
                <td className="px-6 py-4">
                  <textarea
                    value={processControl?.testingApproach || ''}
                    onChange={(e) => handleControlUpdate(control.caNumber, { testingApproach: e.target.value })}
                    className="w-full px-2 py-1 border rounded text-sm"
                    rows={2}
                    placeholder="Describe testing approach..."
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}