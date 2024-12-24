import React from 'react';
import { Trash2 } from 'lucide-react';
import type { SOC2ControlActivity } from '../../../types/risk-matrix';

interface SOC2MatrixRowProps {
  activity: SOC2ControlActivity;
  onUpdate: (activity: SOC2ControlActivity) => void;
  onDelete: (id: string) => void;
}

export function SOC2MatrixRow({ activity, onUpdate, onDelete }: SOC2MatrixRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={activity.caNumber}
          onChange={(e) => onUpdate({ ...activity, caNumber: e.target.value })}
          className="w-20 px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4">
        <textarea
          value={activity.description}
          onChange={(e) => onUpdate({ ...activity, description: e.target.value })}
          className="w-full px-2 py-1 border rounded"
          rows={2}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="text"
          value={activity.tscNumber}
          onChange={(e) => onUpdate({ ...activity, tscNumber: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          value={activity.rait}
          onChange={(e) => onUpdate({ ...activity, rait: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          value={activity.rawc}
          onChange={(e) => onUpdate({ ...activity, rawc: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onDelete(activity.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}