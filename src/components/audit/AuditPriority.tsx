import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const priorityConfig = {
  low: {
    icon: Info,
    className: 'bg-green-100 text-green-800'
  },
  medium: {
    icon: AlertTriangle,
    className: 'bg-yellow-100 text-yellow-800'
  },
  high: {
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800'
  }
};

interface AuditPriorityProps {
  priority: keyof typeof priorityConfig;
}

export function AuditPriority({ priority }: AuditPriorityProps) {
  const { icon: Icon, className } = priorityConfig[priority];
  
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${className}`}>
      <Icon className="h-3 w-3" />
      <span className="text-sm capitalize">{priority}</span>
    </div>
  );
}