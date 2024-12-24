import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { AuditTypeSelector } from './AuditTypeSelector';
import { PhaseTimeline } from './PhaseTimeline';
import { ExaminationPeriod } from './ExaminationPeriod';
import type { ProjectScope } from '../../types/project';

interface ProjectEditFormProps {
  project: ProjectScope;
  onSave: (project: ProjectScope) => void;
  onCancel: () => void;
}

export function ProjectEditForm({ project, onSave, onCancel }: ProjectEditFormProps) {
  const [editedProject, setEditedProject] = useState<ProjectScope>({ ...project });
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectScope, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectScope, string>> = {};
    
    if (!editedProject.groupName) newErrors.groupName = 'Group name is required';
    if (!editedProject.reportName) newErrors.reportName = 'Report name is required';
    if (!editedProject.startDate) newErrors.startDate = 'Start date is required';
    if (!editedProject.endDate) newErrors.endDate = 'End date is required';
    if (!editedProject.reportIssuanceDate) newErrors.reportIssuanceDate = 'Report issuance date is required';

    // Validate examination period (minimum 3 months)
    if (editedProject.startDate && editedProject.endDate) {
      const start = new Date(editedProject.startDate);
      const end = new Date(editedProject.endDate);
      const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
      if (diffMonths < 3) {
        newErrors.endDate = 'Examination period must be at least 3 months';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(editedProject);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Project</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Entity Name
              </label>
              <input
                type="text"
                value={editedProject.groupName}
                onChange={(e) => setEditedProject({ ...editedProject, groupName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.groupName && (
                <p className="mt-1 text-sm text-red-600">{errors.groupName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Name
              </label>
              <input
                type="text"
                value={editedProject.reportName}
                onChange={(e) => setEditedProject({ ...editedProject, reportName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.reportName && (
                <p className="mt-1 text-sm text-red-600">{errors.reportName}</p>
              )}
            </div>
          </div>

          <AuditTypeSelector
            auditType={editedProject.auditType}
            onChange={(updates) => setEditedProject({
              ...editedProject,
              auditType: { ...editedProject.auditType, ...updates }
            })}
          />

          <ExaminationPeriod
            startDate={editedProject.startDate}
            endDate={editedProject.endDate}
            onStartDateChange={(date) => setEditedProject({ ...editedProject, startDate: date })}
            onEndDateChange={(date) => setEditedProject({ ...editedProject, endDate: date })}
            errors={errors}
          />

          <DatePicker
            label="Report Issuance Date"
            value={editedProject.reportIssuanceDate}
            onChange={(date) => setEditedProject({ ...editedProject, reportIssuanceDate: date })}
            error={errors.reportIssuanceDate}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phase Timeline
            </label>
            <PhaseTimeline
              phases={editedProject.phases}
              onChange={(phases) => setEditedProject({ ...editedProject, phases })}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}