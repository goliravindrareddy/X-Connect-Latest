import React from 'react';
import { 
  ClipboardList, 
  FileSpreadsheet, 
  Building2, 
  Settings, 
  FileText, 
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Cog,
  FileCheck
} from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  requiresProject?: boolean;
}

interface SidebarProps {
  currentPage: 'projects' | 'dashboard' | 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests' | 'process-settings' | 'process-requests';
  onPageChange: (page: 'projects' | 'dashboard' | 'entities' | 'risk-matrix' | 'itgc-settings' | 'itgc-requests' | 'process-settings' | 'process-requests') => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems: NavItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: <ClipboardList className="h-5 w-5" />,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    color: 'from-blue-500 to-indigo-500',
    requiresProject: true
  },
  {
    id: 'entities',
    label: 'Entity Details',
    icon: <Building2 className="h-5 w-5" />,
    color: 'from-emerald-500 to-teal-500',
    requiresProject: true
  },
  {
    id: 'risk-matrix',
    label: 'Risk Matrix',
    icon: <FileSpreadsheet className="h-5 w-5" />,
    color: 'from-amber-500 to-orange-500',
    requiresProject: true
  },
  {
    id: 'itgc-settings',
    label: 'ITGC Settings',
    icon: <Settings className="h-5 w-5" />,
    color: 'from-purple-500 to-violet-500',
    requiresProject: true
  },
  {
    id: 'itgc-requests',
    label: 'ITGC Requests',
    icon: <FileText className="h-5 w-5" />,
    color: 'from-cyan-500 to-sky-500',
    requiresProject: true
  },
  {
    id: 'process-settings',
    label: 'Process Settings',
    icon: <Cog className="h-5 w-5" />,
    color: 'from-lime-500 to-green-500',
    requiresProject: true
  },
  {
    id: 'process-requests',
    label: 'Process Requests',
    icon: <FileCheck className="h-5 w-5" />,
    color: 'from-red-500 to-pink-500',
    requiresProject: true
  }
];

export function Sidebar({ currentPage, onPageChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [selectedProjectId] = useLocalStorage<string | undefined>('selectedProjectId', undefined);
  const showNav = selectedProjectId !== undefined || currentPage === 'projects';

  if (!showNav) {
    return (
      <div className={`relative ${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300`}>
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
        <div className="p-4">
          {!isCollapsed && <h2 className="text-xl font-bold text-gray-900">Audit System</h2>}
        </div>
        <div className="p-4 text-gray-600">
          {!isCollapsed && "Please select a project to continue"}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 min-h-screen transition-all duration-300`}>
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>
      <div className="p-4">
        {!isCollapsed && <h2 className="text-xl font-bold text-gray-900">Audit System</h2>}
      </div>
      <nav className="mt-4">
        {navigationItems.map(item => {
          if (item.requiresProject && !selectedProjectId) return null;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                currentPage === item.id 
                  ? `bg-gradient-to-r ${item.color} text-white` 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}