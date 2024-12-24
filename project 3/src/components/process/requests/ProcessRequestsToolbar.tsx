import React from 'react';
import { RefreshCw, Save, FileSpreadsheet } from 'lucide-react';

interface ProcessRequestsToolbarProps {
  onGenerateRequests: () => void;
  onSaveAll: () => void;
  onExportSelected: () => void;
  onExportAll: () => void;
  selectedCount: number;
  totalCount: number;
}

export function ProcessRequestsToolbar({
  onGenerateRequests,
  onSaveAll,
  onExportSelected,
  onExportAll,
  selectedCount,
  totalCount
}: ProcessRequestsToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-600">
        {selectedCount > 0 && (
          <span>{selectedCount} of {totalCount} requests selected</span>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={onGenerateRequests}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Generate Requests
        </button>
        <button
          onClick={onSaveAll}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="h-5 w-5 mr-2" />
          Save All
        </button>
        <div className="flex gap-2">
          <button
            onClick={onExportSelected}
            disabled={selectedCount === 0}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Export Selected
          </button>
          <button
            onClick={onExportAll}
            disabled={totalCount === 0}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Export All
          </button>
        </div>
      </div>
    </div>
  );
}