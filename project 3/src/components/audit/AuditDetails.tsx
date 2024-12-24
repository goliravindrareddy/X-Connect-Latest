import React from 'react';
import { Calendar, FileText, MessageSquare, Paperclip } from 'lucide-react';
import type { Audit } from '../../types';
import { AuditStatus } from './AuditStatus';
import { AuditPriority } from './AuditPriority';
import { FindingsList } from '../findings/FindingsList';
import { CommentSection } from '../comments/CommentSection';
import { AttachmentList } from '../attachments/AttachmentList';

interface AuditDetailsProps {
  audit: Audit;
  onClose: () => void;
}

export function AuditDetails({ audit, onClose }: AuditDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-4/5 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{audit.title}</h2>
            <p className="text-gray-600 mt-1">{audit.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <span>Due: {new Date(audit.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <AuditStatus status={audit.status} />
          </div>
          <div className="flex items-center justify-end">
            <AuditPriority priority={audit.priority} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Findings
              </h3>
              <FindingsList findings={audit.findings} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comments
              </h3>
              <CommentSection comments={audit.comments} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Paperclip className="h-5 w-5 mr-2" />
              Attachments
            </h3>
            <AttachmentList attachments={audit.attachments} />
          </div>
        </div>
      </div>
    </div>
  );
}