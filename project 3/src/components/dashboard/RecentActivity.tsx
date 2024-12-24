import React from 'react';
import { Activity, FileText, Users, Settings } from 'lucide-react';
import type { ProjectScope } from '../../types/project';

interface RecentActivityProps {
  project: ProjectScope;
}

export function RecentActivity({ project }: RecentActivityProps) {
  // In a real app, this would fetch from an API
  const activities = [
    {
      id: '1',
      type: 'entity',
      message: 'New entity added to scope',
      timestamp: new Date().toISOString(),
      icon: Users
    },
    {
      id: '2',
      type: 'control',
      message: 'Risk matrix updated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      icon: FileText
    },
    {
      id: '3',
      type: 'settings',
      message: 'ITGC settings modified',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      icon: Settings
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map(activity => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}