import React from 'react';
import { CheckCircle, Clock, AlertCircle, Database, Monitor, Layout } from 'lucide-react';
import type { ITGCRequest } from '../../../types/itgc-request';

interface ITGCRequestsDashboardProps {
  requests: ITGCRequest[];
}

export function ITGCRequestsDashboard({ requests }: ITGCRequestsDashboardProps) {
  const metrics = {
    status: {
      open: requests.filter(r => r.status === 'Open').length,
      inProgress: requests.filter(r => r.status === 'In Progress').length,
      submitted: requests.filter(r => r.status === 'Client Submitted').length,
      closed: requests.filter(r => r.status === 'Closed').length
    },
    coverage: {
      applications: new Set(requests.filter(r => r.itElement === 'Application').map(r => r.applicationName)).size,
      os: new Set(requests.filter(r => r.itElement === 'Operating System').map(r => r.applicationName)).size,
      db: new Set(requests.filter(r => r.itElement === 'Database').map(r => r.applicationName)).size
    }
  };

  return (
    <div className="grid grid-cols-7 gap-4 mb-6">
      {/* Status Metrics */}
      <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
        <Clock className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-xs text-gray-600">Open</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.status.open}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg">
        <AlertCircle className="h-5 w-5 text-yellow-600" />
        <div>
          <p className="text-xs text-gray-600">In Progress</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.status.inProgress}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <p className="text-xs text-gray-600">Submitted</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.status.submitted}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
        <CheckCircle className="h-5 w-5 text-gray-600" />
        <div>
          <p className="text-xs text-gray-600">Closed</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.status.closed}</p>
        </div>
      </div>

      {/* Coverage Metrics */}
      <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
        <Layout className="h-5 w-5 text-purple-600" />
        <div>
          <p className="text-xs text-gray-600">Apps</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.coverage.applications}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
        <Monitor className="h-5 w-5 text-indigo-600" />
        <div>
          <p className="text-xs text-gray-600">OS</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.coverage.os}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-cyan-50 p-3 rounded-lg">
        <Database className="h-5 w-5 text-cyan-600" />
        <div>
          <p className="text-xs text-gray-600">DB</p>
          <p className="text-lg font-semibold text-gray-900">{metrics.coverage.db}</p>
        </div>
      </div>
    </div>
  );
}