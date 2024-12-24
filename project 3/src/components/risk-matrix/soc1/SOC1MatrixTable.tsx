import React from 'react';
import { Plus } from 'lucide-react';
import { SOC1MatrixRow } from './SOC1MatrixRow';
import { BulkUploadButton } from '../../common/BulkUploadButton';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { formatControlNumber } from '../../../utils/formatters';
import type { ControlObjective } from '../../../types/risk-matrix';

interface SOC1MatrixTableProps {
  projectId: string;
}

export function SOC1MatrixTable({ projectId }: SOC1MatrixTableProps) {
  const [objectives, setObjectives] = useLocalStorage<ControlObjective[]>(
    `soc1-objectives-${projectId}`,
    []
  );

  const addObjective = () => {
    const nextNumber = objectives.length + 1;
    setObjectives([
      ...objectives,
      {
        id: crypto.randomUUID(),
        coNumber: formatControlNumber('CO', nextNumber),
        description: '',
        testingType: '',
        controlActivities: []
      }
    ]);
  };

  const updateObjective = (objective: ControlObjective) => {
    setObjectives(objectives.map(obj => 
      obj.id === objective.id ? objective : obj
    ));
  };

  const deleteObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const handleBulkUpload = (data: any[]) => {
    const newObjectives: ControlObjective[] = [];
    let currentObjective: ControlObjective | null = null;

    data.forEach(row => {
      // If CO Number is provided, create a new control objective
      if (row['CO Number']) {
        if (currentObjective) {
          newObjectives.push(currentObjective);
        }
        currentObjective = {
          id: crypto.randomUUID(),
          coNumber: row['CO Number'],
          description: row['Control Objective'] || '',
          testingType: row['Testing Type'] || '',
          controlActivities: []
        };
      }

      // If CA Number is provided, add control activity to current objective
      if (row['CA Number'] && currentObjective) {
        currentObjective.controlActivities.push({
          id: crypto.randomUUID(),
          caNumber: row['CA Number'],
          description: row['Control Activity'] || '',
          itElement: row['IT Element'] || '',
          rfi: row['RFI'] || '',
          rait: row['RAIT'] || '',
          rawc: row['RAWC'] || '',
          assertions: []
        });
      }
    });

    // Add the last objective if exists
    if (currentObjective) {
      newObjectives.push(currentObjective);
    }

    // Update state with new objectives
    setObjectives(newObjectives);

    // Show success message
    alert('Data imported successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden max-w-[1600px] mx-auto">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">SOC 1 Control Matrix</h2>
        <div className="flex gap-4">
          <BulkUploadButton
            templateType="riskMatrix"
            onUpload={handleBulkUpload}
          />
          <button
            onClick={addObjective}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Control Objective
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <colgroup>
            <col className="w-[5%]"/>
            <col className="w-[6.5%]"/>
            <col className="w-[17%]"/>
            <col className="w-[6.5%]"/>
            <col className="w-[17%]"/>
            <col className="w-[8%]"/>
            <col className="w-[17%]"/>
            <col className="w-[10%]"/>
            <col className="w-[10%]"/>
            <col className="w-[3%]"/>
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Testing Type</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">CO No</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control Objective</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">CA No</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control Activity</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IT Element</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFI</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">RAIT</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">RAWC</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {objectives.map(objective => (
              <SOC1MatrixRow
                key={objective.id}
                objective={objective}
                onUpdate={updateObjective}
                onDelete={deleteObjective}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}