import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import type { Finding } from '../../types';

interface FindingsListProps {
  findings: Finding[];
}

export function FindingsList({ findings }: FindingsListProps) {
  return (
    <div className="space-y-4">
      {findings.map((finding) => (
        <div
          key={finding.id}
          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{finding.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
            </div>
            <span className={`
              px-2 py-1 rounded-full text-sm
              ${finding.severity === 'critical' ? 'bg-red-100 text-red-800' :
                finding.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'}
            `}>
              {finding.severity}
            </span>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center">
              {finding.status === 'resolved' ? (
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
              )}
              <span>{finding.status}</span>
            </div>
            {finding.assignee && (
              <span className="text-gray-500">Assigned to: {finding.assignee}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}