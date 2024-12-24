import React from 'react';
import { Clock, CheckCircle, PlayCircle, Clock4 } from 'lucide-react';
import type { ProjectScope } from '../../types/project';

interface ProjectTimelineProps {
  project: ProjectScope;
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  const today = new Date();

  // Calculate project progress
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  const progress = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);

  // Calculate phase status
  const getPhaseStatus = (phase: ProjectScope['phases'][0]) => {
    const phaseStart = new Date(phase.startDate);
    const phaseEnd = new Date(phase.endDate);

    if (today < phaseStart) return 'upcoming';
    if (today > phaseEnd) return 'completed';
    return 'in-progress';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Project Timeline
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {project.phases.map((phase, index) => {
            const status = getPhaseStatus(phase);
            const PhaseIcon = status === 'upcoming' ? Clock4 :
                            status === 'completed' ? CheckCircle : PlayCircle;
            
            const statusConfig = {
              'upcoming': {
                badge: 'bg-gray-100 text-gray-600',
                text: 'Upcoming'
              },
              'completed': {
                badge: 'bg-emerald-100 text-emerald-600',
                text: 'Completed'
              },
              'in-progress': {
                badge: 'bg-blue-100 text-blue-600',
                text: 'In Progress'
              }
            };
            
            return (
              <div key={phase.id} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                    <PhaseIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{phase.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                    </p>
                    {phase.rfiRequestStartDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        RFI Requests Start: {new Date(phase.rfiRequestStartDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig[status].badge}`}>
                      {statusConfig[status].text}
                    </span>
                  </div>
                </div>
                {index < project.phases.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-purple-500 opacity-20"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}