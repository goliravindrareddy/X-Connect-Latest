import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { RiskMatrixControls } from '../RiskMatrixControls';
import type { ControlObjective, ControlActivity } from '../../../types/risk-matrix';

interface SOC1MatrixRowProps {
  objective: ControlObjective;
  onUpdate: (updated: ControlObjective) => void;
  onDelete: (id: string) => void;
}

export function SOC1MatrixRow({ objective, onUpdate, onDelete }: SOC1MatrixRowProps) {
  const addActivity = () => {
    onUpdate({
      ...objective,
      controlActivities: [
        ...objective.controlActivities,
        {
          id: crypto.randomUUID(),
          caNumber: `CA${objective.controlActivities.length + 1}`,
          description: '',
          itElement: '',
          rfi: '',
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
    if (confirm('Are you sure you want to delete this control activity?')) {
      onUpdate({
        ...objective,
        controlActivities: objective.controlActivities.filter(act => act.id !== activityId)
      });
    }
  };

  const handleDeleteObjective = () => {
    if (confirm('Are you sure you want to delete this control objective? This will also delete all associated control activities.')) {
      onDelete(objective.id);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-3 py-2">
          <select
            value={objective.testingType}
            onChange={(e) => onUpdate({ ...objective, testingType: e.target.value as 'ITGC' | 'Process' | '' })}
            className="w-full px-2 py-1 border rounded text-sm"
          >
            <option value="">Select Type</option>
            <option value="ITGC">ITGC</option>
            <option value="Process">Process</option>
          </select>
        </td>
        <td className="px-3 py-2">
          <input
            type="text"
            value={objective.coNumber}
            onChange={(e) => onUpdate({ ...objective, coNumber: e.target.value })}
            className="w-full px-2 py-1 border rounded text-sm"
          />
        </td>
        <td className="px-3 py-2">
          <textarea
            value={objective.description}
            onChange={(e) => onUpdate({ ...objective, description: e.target.value })}
            className="w-full px-2 py-1 border rounded text-sm min-h-[60px] resize-y"
            rows={2}
          />
        </td>
        <td colSpan={6} className="px-3 py-2">
          <button
            onClick={addActivity}
            className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Activity
          </button>
        </td>
        <td className="px-3 py-2 text-center">
          <button
            onClick={handleDeleteObjective}
            className="text-red-600 hover:text-red-800"
            title="Delete Control Objective"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </td>
      </tr>
      {objective.controlActivities.map(activity => (
        <tr key={activity.id} className="bg-gray-50">
          <td className="px-3 py-2" colSpan={2} />
          <td className="px-3 py-2" />
          <td className="px-3 py-2">
            <input
              type="text"
              value={activity.caNumber}
              onChange={(e) => updateActivity({ ...activity, caNumber: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Enter CA number"
            />
          </td>
          <td className="px-3 py-2">
            <textarea
              value={activity.description}
              onChange={(e) => updateActivity({ ...activity, description: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm min-h-[60px] resize-y"
              rows={2}
            />
          </td>
          <td className="px-3 py-2">
            <select
              value={activity.itElement}
              onChange={(e) => updateActivity({ ...activity, itElement: e.target.value as ControlActivity['itElement'] })}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Select IT Element</option>
              <option value="Application">Application</option>
              <option value="Operating System">Operating System</option>
              <option value="Database">Database</option>
            </select>
          </td>
          <td className="px-3 py-2">
            <textarea
              value={activity.rfi}
              onChange={(e) => updateActivity({ ...activity, rfi: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm min-h-[60px] resize-y"
              rows={2}
              placeholder="Enter RFI details..."
            />
          </td>
          <td className="px-3 py-2">
            <RiskMatrixControls
              type="rait"
              value={activity.rait}
              onChange={(value) => updateActivity({ ...activity, rait: value })}
            />
          </td>
          <td className="px-3 py-2">
            <RiskMatrixControls
              type="rawc"
              value={activity.rawc}
              onChange={(value) => updateActivity({ ...activity, rawc: value })}
            />
          </td>
          <td className="px-3 py-2 text-center">
            <button
              onClick={() => deleteActivity(activity.id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Control Activity"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}