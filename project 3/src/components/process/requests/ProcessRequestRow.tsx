import React from 'react';
import { Trash2, Save } from 'lucide-react';
import { ITGCRequestAttachments } from '../../itgc/requests/ITGCRequestAttachments';
import { ITGCRequestComments } from '../../itgc/requests/ITGCRequestComments';
import { NewTag } from '../../itgc/requests/NewTag';
import type { ProcessRequest } from '../../../types/process';

interface ProcessRequestRowProps {
  request: ProcessRequest;
  isSelected: boolean;
  onUpdate: (request: ProcessRequest) => void;
  onDelete: (id: string) => void;
  onSave: (id: string) => void;
  onSelect: (id: string, selected: boolean) => void;
}

export function ProcessRequestRow({
  request,
  isSelected,
  onUpdate,
  onDelete,
  onSave,
  onSelect
}: ProcessRequestRowProps) {
  const isNew = () => {
    const createdAt = new Date(request.createdAt);
    const now = new Date();
    const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(request.id, e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-900">{request.caNumber}</span>
          {isNew() && <NewTag />}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{request.description}</span>
      </td>
      <td className="px-6 py-4">
        <select
          value={request.frequency}
          onChange={(e) => onUpdate({ ...request, frequency: e.target.value as ProcessRequest['frequency'] })}
          className="w-full px-2 py-1 border rounded text-sm"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Annually">Annually</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={request.sampleSize}
          onChange={(e) => onUpdate({ ...request, sampleSize: parseInt(e.target.value) })}
          className="w-full px-2 py-1 border rounded text-sm"
          min={1}
        />
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{request.period}</span>
      </td>
      <td className="px-6 py-4">
        <input
          type="date"
          value={request.dueDate}
          onChange={(e) => onUpdate({ ...request, dueDate: e.target.value })}
          className="w-full px-2 py-1 border rounded text-sm"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          value={request.clientPOC}
          onChange={(e) => onUpdate({ ...request, clientPOC: e.target.value })}
          className="w-full px-2 py-1 border rounded text-sm"
          placeholder="Enter client POC"
        />
      </td>
      <td className="px-6 py-4">
        <select
          value={request.status}
          onChange={(e) => onUpdate({ 
            ...request, 
            status: e.target.value as ProcessRequest['status'],
            statusChangedAt: new Date().toISOString()
          })}
          className="w-full px-2 py-1 border rounded text-sm"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Client Submitted">Client Submitted</option>
          <option value="Closed">Closed</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <ITGCRequestAttachments
          attachments={request.attachments}
          onAddAttachment={(file) => {
            const newAttachment = {
              id: crypto.randomUUID(),
              name: file.name,
              url: URL.createObjectURL(file),
              type: file.type,
              size: file.size,
              uploadedBy: 'Current User',
              uploadedAt: new Date().toISOString()
            };
            onUpdate({
              ...request,
              attachments: [...request.attachments, newAttachment]
            });
          }}
          onRemoveAttachment={(id) => {
            onUpdate({
              ...request,
              attachments: request.attachments.filter(a => a.id !== id)
            });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <ITGCRequestComments
          comments={request.comments || []}
          onAddComment={(content) => {
            const newComment = {
              id: crypto.randomUUID(),
              content,
              author: {
                id: '1',
                name: 'Current User',
                role: 'auditor',
                email: 'user@example.com',
                permissions: ['read', 'write']
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              attachments: []
            };
            onUpdate({
              ...request,
              comments: [...(request.comments || []), newComment]
            });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onSave(request.id)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Save changes"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(request.id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete request"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}