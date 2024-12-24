import React from 'react';
import { CheckCircle, Clock, PlayCircle, RefreshCw } from 'lucide-react';

const statusConfig = {
  planned: { icon: Clock, className: 'text-blue-600' },
  'in-progress': { icon: PlayCircle, className: 'text-yellow-600' },
  review: { icon: RefreshCw, className: 'text-purple-600' },
  completed: { icon: CheckCircle, className: 'text-green-600' }
};

interface AuditStatusProps {
  status: keyof typeof statusConfig;
}

export function AuditStatus({ status }: AuditStatusProps) {
  const { icon: Icon, className } = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${className}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
}