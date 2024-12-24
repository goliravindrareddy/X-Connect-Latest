import React, { useState } from 'react';
import { Calendar, Building2, FileText, Clock, X } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { PhaseTimeline } from './PhaseTimeline';
import { AuditTypeSelector } from './AuditTypeSelector';
import { ExaminationPeriod } from './ExaminationPeriod';
import type { ProjectScope } from '../../types/project';

interface ProjectScopeFormProps {
  onSave: (project: ProjectScope) => void;
  onCancel: () => void;
}

export function ProjectScopeForm({ onSave, onCancel }: ProjectScopeFormProps) {
  const [scope, setScope] = useState<ProjectScope>({
    id: crypto.randomUUID(),
    groupName: '',
    reportName: '',
    startDate: '',
    endDate: '',
    reportIssuanceDate: '',
    phases: [],
    auditType: {
      socType: '',
      reportType: ''
    },
    status: 'active'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectScope, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectScope, string>> = {};
    
    if (!scope.groupName) newErrors.groupName = 'Group name is required';
    if (!scope.reportName) newErrors.reportName = 'Report name is required';
    if (!scope.startDate) newErrors.startDate = 'Start date is required';
    if (!scope.endDate) newErrors.endDate = 'End date is required';
    if (!scope.reportIssuanceDate) newErrors.reportIssuanceDate = 'Report issuance date is required';

    // Validate examination period (minimum 3 months)
    if (scope.startDate && scope.endDate) {
      const start = new Date(scope.startDate);
      const end = new Date(scope.endDate);
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
      onSave(scope);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">New Project Scope</h1>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Building2 className="inline h-4 w-4 mr-2" />
                Group Entity Name
              </label>
              <input
                type="text"
                value={scope.groupName}
                onChange={(e) => setScope({ ...scope, groupName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.groupName && (
                <p className="mt-1 text-sm text-red-600">{errors.groupName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="inline h-4 w-4 mr-2" />
                Report Name
              </label>
              <input
                type="text"
                value={scope.reportName}
                onChange={(e) => setScope({ ...scope, reportName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.reportName && (
                <p className="mt-1 text-sm text-red-600">{errors.reportName}</p>
              )}
            </div>
          </div>

          <AuditTypeSelector
            auditType={scope.auditType}
            onChange={(updates) => setScope({
              ...scope,
              auditType: { ...scope.auditType, ...updates }
            })}
          />

          <ExaminationPeriod
            startDate={scope.startDate}
            endDate={scope.endDate}
            onStartDateChange={(date) => setScope({ ...scope, startDate: date })}
            onEndDateChange={(date) => setScope({ ...scope, endDate: date })}
            errors={errors}
          />

          <DatePicker
            label="Report Issuance Date"
            value={scope.reportIssuanceDate}
            onChange={(date) => setScope({ ...scope, reportIssuanceDate: date })}
            error={errors.reportIssuanceDate}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-2" />
              Phase Timeline
            </label>
            <PhaseTimeline
              phases={scope.phases}
              onChange={(phases) => setScope({ ...scope, phases })}
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}