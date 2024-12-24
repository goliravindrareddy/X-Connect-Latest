import React from 'react';
import { ITGCRequestRow } from './ITGCRequestRow';
import type { ITGCRequest } from '../../../types/itgc-request';

interface ITGCRequestsTableProps {
  requests: ITGCRequest[];
  selectedRequests: Set<string>;
  onUpdateRequest: (request: ITGCRequest) => void;
  onDeleteRequest: (id: string) => void;
  onSaveRequest: (id: string) => void;
  onSelectRequest: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export function ITGCRequestsTable({
  requests,
  selectedRequests,
  onUpdateRequest,
  onDeleteRequest,
  onSaveRequest,
  onSelectRequest,
  onSelectAll
}: ITGCRequestsTableProps) {
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CA No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IT Element</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RFI</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client POC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attachments</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <ITGCRequestRow
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