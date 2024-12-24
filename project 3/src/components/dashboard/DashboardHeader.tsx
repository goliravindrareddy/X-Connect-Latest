import React from 'react';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import type { ProjectScope } from '../../types/project';

interface DashboardHeaderProps {
  project: ProjectScope;
}

export function DashboardHeader({ project }: DashboardHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{project.groupName}</h1>
            <p className="text-blue-100 mt-1">{project.reportName}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-sm bg-white/10 rounded-full px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm bg-white/10 rounded-full px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              <span>{project.auditType.socType} Type {project.auditType.reportType}</span>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-full text-sm
              ${project.status === 'active' ? 'bg-emerald-500' :
                project.status === 'completed' ? 'bg-blue-500' :
                'bg-amber-500'}`}>
              <Clock className="h-4 w-4 mr-2" />
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}