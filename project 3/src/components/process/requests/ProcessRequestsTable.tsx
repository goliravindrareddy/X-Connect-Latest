import React from 'react';
import { ProcessRequestRow } from './ProcessRequestRow';
import type { ProcessRequest } from '../../../types/process';

interface ProcessRequestsTableProps {
  requests: ProcessRequest[];
  selectedRequests: Set<string>;
  onUpdateRequest: (request: ProcessRequest) => void;
  onDeleteRequest: (id: string) => void;
  onSaveRequest: (id: string) => void;
  onSelectRequest: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export function ProcessRequestsTable({
  requests,
  selectedRequests,
  onUpdateRequest,
  onDeleteRequest,
  onSaveRequest,
  onSelectRequest,
  onSelectAll
}: ProcessRequestsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <input
                type="checkbox"
                checked={requests.length > 0 && selectedRequests.size === requests.length}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control Activity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client POC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <ProcessRequestRow
              key={request.id}
              request={request}
              isSelected={selectedRequests.has(request.id)}
              onUpdate={onUpdateRequest}
              onDelete={onDeleteRequest}
              onSave={onSaveRequest}
              onSelect={onSelectRequest}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}