import React from 'react';
import { 
  Building2, 
  Shield, 
  Database, 
  Network,
  ChevronRight
} from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { ProjectScope } from '../../types/project';
import type { EntityDetails } from '../../types/entity';
import type { ControlObjective } from '../../types/risk-matrix';
import type { ITGCRequest } from '../../types/itgc-request';

interface DashboardStatsProps {
  project: ProjectScope;
  onNavigate: (page: 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests') => void;
}

export function DashboardStats({ project, onNavigate }: DashboardStatsProps) {
  const [entities] = useLocalStorage<EntityDetails[]>('entities', []);
  const [objectives] = useLocalStorage<ControlObjective[]>(`soc1-objectives-${project.id}`, []);
  const [requests] = useLocalStorage<ITGCRequest[]>('itgc-requests', []);

  const projectEntities = entities.filter(e => e.projectId === project.id);
  const projectRequests = requests.filter(r => r.projectId === project.id);

  const stats = [
    {
      id: 'entities',
      label: 'Entities',
      value: projectEntities.length,
      icon: Building2,
      gradient: 'from-rose-500 to-pink-600',
      onClick: () => onNavigate('entities')
    },
    {
      id: 'controls',
      label: 'Control Activities',
      value: objectives.reduce((acc, obj) => acc + obj.controlActivities.length, 0),
      icon: Shield,
      gradient: 'from-purple-500 to-indigo-600',
      onClick: () => onNavigate('risk-matrix')
    },
    {
      id: 'itgc',
      label: 'ITGC Applications',
      value: projectEntities.filter(e => e.itgcRequired).length,
      icon: Database,
      gradient: 'from-cyan-500 to-blue-600',
      onClick: () => onNavigate('itgc-settings')
    },
    {
      id: 'requests',
      label: 'ITGC Requests',
      value: projectRequests.length,
      icon: Network,
      gradient: 'from-amber-500 to-orange-600',
      onClick: () => onNavigate('itgc-requests')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <button
          key={stat.id}
          onClick={stat.onClick}
          className="group bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        </button>
      ))}
    </div>
  );
}