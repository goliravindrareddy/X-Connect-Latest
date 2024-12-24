import React from 'react';
import { Download } from 'lucide-react';
import { downloadTemplate, type TemplateType } from '../../utils/excelTemplates';

interface TemplateDownloadProps {
  type: TemplateType;
  className?: string;
  children?: React.ReactNode;
}

export function TemplateDownload({ type, className = '', children }: TemplateDownloadProps) {
  return (
    <button
      onClick={() => downloadTemplate(type)}
      className={`inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 ${className}`}
    >
      {children || (
        <>
          <Download className="h-5 w-5 mr-2" />
          Download Template
        </>
      )}
    </button>
  );
}