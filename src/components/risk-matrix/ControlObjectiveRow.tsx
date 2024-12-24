import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { ControlObjective, ControlActivity } from '../../types/risk-matrix';

interface ControlObjectiveRowProps {
  objective: ControlObjective;
  onUpdate: (updated: ControlObjective) => void;
  onDelete: (id: string) => void;
}

export function ControlObjectiveRow({ objective, onUpdate, onDelete }: ControlObjectiveRowProps) {
  const addActivity = () => {
    onUpdate({
      ...objective,
      controlActivities: [
        ...objective.controlActivities,
        {
          id: crypto.randomUUID(),
          caNumber: `CA${objective.controlActivities.length + 1}`,
          description: '',
          rait: '',
          rawc: '',
          assertions: []
        }
      ]
    });
  };

  const updateActivity = (activity: ControlActivity) => {
    onUpdate({
      ...objective,
      controlActivities: objective.controlActivities.map(act =>
        act.id === activity.id ? activity : act
      )
    });
  };

  const deleteActivity = (activityId: string) => {
    onUpdate({
      ...objective,
      controlActivities: objective.controlActivities.filter(act => act.id !== activityId)
    });
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="text"
            value={objective.coNumber}
            onChange={(e) => onUpdate({ ...objective, coNumber: e.target.value })}
            className="w-20 px-2 py-1 border rounded"
          />
        </td>
        <td className="px-6 py-4">
          <textarea
            value={objective.description}
            onChange={(e) => onUpdate({ ...objective, description: e.target.value })}
            className="w-full px-2 py-1 border rounded"
            rows={2}
          />
        </td>
        <td colSpan={4} className="px-6 py-4">
          <button
            onClick={addActivity}
            className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Activity
          </button>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => onDelete(objective.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </td>
      </tr>
      {objective.controlActivities.map(activity => (
        <tr key={activity.id} className="bg-gray-50">
          <td className="px-6 py-4" />
          <td className="px-6 py-4" />
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              value={activity.caNumber}
              onChange={(e) => updateActivity({ ...activity, caNumber: e.target.value })}
              className="w-20 px-2 py-1 border rounded"
            />
          </td>
          <td className="px-6 py-4">
            <textarea
              value={activity.description}
              onChange={(e) => updateActivity({ ...activity, description: e.target.value })}
              className="w-full px-2 py-1 border rounded"
              rows={2}
            />
          </td>
          <td className="px-6 py-4">
            <input
              type="text"
              value={activity.rait}
              onChange={(e) => updateActivity({ ...activity, rait: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-6 py-4">
            <input
              type="text"
              value={activity.rawc}
              onChange={(e) => updateActivity({ ...activity, rawc: e.target.value })}
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-6 py-4">
            <select
              multiple
              value={activity.assertions}
              onChange={(e) => updateActivity({
                ...activity,
                assertions: Array.from(e.target.selectedOptions, option => option.value)
              })}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="completeness">Completeness</option>
              <option value="accuracy">Accuracy</option>
              <option value="validity">Validity</option>
              <option value="restricted">Restricted Access</option>
            </select>
          </td>
          <td className="px-6 py-4">
            <button
              onClick={() => deleteActivity(activity.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}