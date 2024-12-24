import React from 'react';
import { File, Download, Trash2 } from 'lucide-react';
import type { Attachment } from '../../types';

interface AttachmentListProps {
  attachments: Attachment[];
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center">
            <File className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="font-medium">{attachment.name}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(attachment.size)} • Uploaded by {attachment.uploadedBy}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Download"
            >
              <Download className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Delete"
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}