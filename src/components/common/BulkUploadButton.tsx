import React from 'react';
import { Upload, Download } from 'lucide-react';
import { ExcelUpload } from './ExcelUpload';
import { TemplateDownload } from './TemplateDownload';
import type { TemplateType } from '../../utils/excelTemplates';

interface BulkUploadButtonProps {
  templateType: TemplateType;
  onUpload: (data: any[]) => void;
  className?: string;
}

export function BulkUploadButton({ templateType, onUpload, className = '' }: BulkUploadButtonProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <TemplateDownload type={templateType} />
      <ExcelUpload onUpload={onUpload}>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Upload className="h-5 w-5 mr-2" />
          Upload Data
        </button>
      </ExcelUpload>
    </div>
  );
}