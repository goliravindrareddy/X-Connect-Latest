import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Phase } from '../../types/project';

interface PhaseTimelineProps {
  phases: Phase[];
  onChange: (phases: Phase[]) => void;
}

export function PhaseTimeline({ phases, onChange }: PhaseTimelineProps) {
  const addPhase = () => {
    onChange([
      ...phases,
      {
        id: Date.now().toString(),
        name: '',
        startDate: '',
        endDate: '',
        rfiRequestStartDate: ''
      }
    ]);
  };

  const removePhase = (id: string) => {
    onChange(phases.filter(phase => phase.id !== id));
  };

  const updatePhase = (id: string, updates: Partial<Phase>) => {
    onChange(phases.map(phase => 
      phase.id === id ? { ...phase, ...updates } : phase
    ));
  };

  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <div key={phase.id} className="flex items-start gap-4 p-4 border rounded-md bg-gray-50">
          <div className="flex-1">
            <div className="mb-3">
              <input
                type="text"
                value={phase.name}
                onChange={(e) => updatePhase(phase.id, { name: e.target.value })}
                placeholder={`Phase ${index + 1} Name`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={phase.startDate}
                  onChange={(e) => updatePhase(phase.id, { startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={phase.endDate}
                  onChange={(e) => updatePhase(phase.id, { endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">RFI Request Start Date</label>
                <input
                  type="date"
                  value={phase.rfiRequestStartDate}
                  onChange={(e) => updatePhase(phase.id, { rfiRequestStartDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removePhase(phase.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addPhase}
        className="flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Phase
      </button>
    </div>
  );
}