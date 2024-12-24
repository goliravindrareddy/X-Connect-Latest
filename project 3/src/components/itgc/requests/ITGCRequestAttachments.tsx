import React, { useRef } from 'react';
import { Paperclip, Upload, X } from 'lucide-react';
import type { Attachment } from '../../../types';

interface ITGCRequestAttachmentsProps {
  attachments: Attachment[];
  onAddAttachment: (file: File) => void;
  onRemoveAttachment: (id: string) => void;
}

export function ITGCRequestAttachments({ 
  attachments, 
  onAddAttachment,
  onRemoveAttachment 
}: ITGCRequestAttachmentsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAddAttachment(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1 hover:bg-gray-100 rounded"
          title="Add attachment"
        >
          <Upload className="h-4 w-4 text-gray-600" />
        </button>
        {attachments.length > 0 && (
          <span className="flex items-center text-sm text-gray-600">
            <Paperclip className="h-4 w-4 mr-1" />
            {attachments.length}
          </span>
        )}
      </div>

      {/* Attachments dropdown */}
      {attachments.length > 0 && (
        <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-10 p-2">
          <div className="max-h-48 overflow-y-auto">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2 truncate">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700 truncate">
                    {attachment.name}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}