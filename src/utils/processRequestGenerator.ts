import type { ProcessRequest } from '../types/process';
import type { ControlActivity } from '../types/risk-matrix';
import type { Phase } from '../types/project';
import { addWorkingDays, formatDate } from './dateUtils';

export function generateProcessRequests(
  projectId: string,
  controls: ControlActivity[],
  phases: Phase[]
): ProcessRequest[] {
  const requests: ProcessRequest[] = [];
  const firstPhase = phases[0];
  
  if (!firstPhase) return requests;

  const dueDate = formatDate(addWorkingDays(new Date(firstPhase.startDate), 5));
  const now = new Date().toISOString();

  controls.forEach(control => {
    requests.push({
      id: crypto.randomUUID(),
      projectId,
      applicationName: control.applicationName || '',
      caNumber: control.caNumber,
      phase: firstPhase.name,
      frequency: 'Monthly', // Default frequency
      sampleSize: 25, // Default sample size
      period: `${new Date(firstPhase.startDate).toLocaleDateString()} - ${new Date(firstPhase.endDate).toLocaleDateString()}`,
      requestType: 'Documentation',
      description: control.description,
      dueDate,
      attachments: [],
      clientPOC: '',
      status: 'Open',
      createdAt: now,
      updatedAt: now
    });
  });

  return requests;
}