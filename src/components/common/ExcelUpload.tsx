import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { parseExcelData } from '../../utils/excelTemplates';

interface ExcelUploadProps {
  onUpload: (data: any[]) => void;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ExcelUpload({ onUpload, accept = '.xlsx,.xls', className = '', children }: ExcelUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseExcelData(file);
      onUpload(data);
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to parse Excel file:', error);
      alert('Failed to parse Excel file. Please ensure you are using the correct template.');
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      {children || (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Excel
        </button>
      )}
    </div>
  );
}