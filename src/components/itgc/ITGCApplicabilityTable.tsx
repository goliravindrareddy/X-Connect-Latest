import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ITGCApplicability } from '../../types/itgc';
import type { EntityDetails } from '../../types/entity';

interface ITGCApplicabilityTableProps {
  applicability: ITGCApplicability[];
  setApplicability: (value: ITGCApplicability[]) => void;
  availableApplications: EntityDetails[];
}

export function ITGCApplicabilityTable({ 
  applicability, 
  setApplicability,
  availableApplications 
}: ITGCApplicabilityTableProps) {
  const addApplicability = () => {
    setApplicability([
      ...applicability,
      {
        id: crypto.randomUUID(),
        applicationName: '',
        controls: []
      }
    ]);
  };

  const updateApplicability = (id: string, updates: Partial<ITGCApplicability>) => {
    setApplicability(
      applicability.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteApplicability = (id: string) => {
    setApplicability(applicability.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Application Controls</h3>
        <button
          onClick={addApplicability}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Application
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ITGC Applicable Controls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applicability.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <select
                    value={item.applicationName}
                    onChange={(e) => updateApplicability(item.id, { applicationName: e.target.value })}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded"
                  >
                    <option value="">Select Application</option>
                    {availableApplications.map(app => (
                      <option key={app.id} value={app.applicationName}>
                        {app.applicationName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={item.controls.join(', ')}
                    onChange={(e) => updateApplicability(item.id, { 
                      controls: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded"
                    placeholder="Enter CA numbers (comma-separated)"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteApplicability(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}