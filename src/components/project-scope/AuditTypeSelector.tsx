import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import type { AuditType } from '../../types/project';

interface AuditTypeSelectorProps {
  auditType: AuditType;
  onChange: (updates: Partial<AuditType>) => void;
}

export function AuditTypeSelector({ auditType, onChange }: AuditTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
        <ClipboardCheck className="h-4 w-4 mr-2" />
        Type of Audit
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            value={auditType.socType}
            onChange={(e) => onChange({ socType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select SOC Type</option>
            <option value="SOC1">SOC 1</option>
            <option value="SOC2">SOC 2</option>
          </select>
        </div>
        <div>
          <select
            value={auditType.reportType}
            onChange={(e) => onChange({ reportType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Report Type</option>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
          </select>
        </div>
      </div>
    </div>
  );
}