import React from 'react';
import { Plus } from 'lucide-react';
import { SOC2MatrixRow } from './SOC2MatrixRow';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import type { SOC2ControlActivity } from '../../../types/risk-matrix';

interface SOC2MatrixTableProps {
  projectId: string;
}

export function SOC2MatrixTable({ projectId }: SOC2MatrixTableProps) {
  const [activities, setActivities] = useLocalStorage<SOC2ControlActivity[]>(
    `soc2-activities-${projectId}`,
    []
  );

  const addActivity = () => {
    setActivities([
      ...activities,
      {
        id: crypto.randomUUID(),
        caNumber: `CA${activities.length + 1}`,
        description: '',
        tscNumber: '',
        rait: '',
        rawc: ''
      }
    ]);
  };

  const updateActivity = (activity: SOC2ControlActivity) => {
    setActivities(activities.map(a => 
      a.id === activity.id ? activity : a
    ));
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">SOC 2 Control Matrix</h2>
        <button
          onClick={addActivity}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Control Activity
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TSC No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RAIT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RAWC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map(activity => (
              <SOC2MatrixRow
                key={activity.id}
                activity={activity}
                onUpdate={updateActivity}
                onDelete={deleteActivity}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}