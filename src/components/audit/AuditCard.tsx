import React from 'react';
import { Calendar, User } from 'lucide-react';
import type { Audit } from '../../types';
import { AuditStatus } from './AuditStatus';
import { AuditPriority } from './AuditPriority';

interface AuditCardProps {
  audit: Audit;
  onClick?: () => void;
}

export function AuditCard({ audit, onClick }: AuditCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{audit.title}</h3>
        <AuditPriority priority={audit.priority} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">Due: {new Date(audit.dueDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <User className="h-4 w-4 mr-2" />
          <span className="text-sm">{audit.assignee || 'Unassigned'}</span>
        </div>
        
        <AuditStatus status={audit.status} />
      </div>
    </div>
  );
}