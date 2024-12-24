import type { ITGCRequest } from '../types/itgc-request';
import type { EntityDetails } from '../types/entity';
import type { ControlActivity } from '../types/risk-matrix';
import type { Phase } from '../types/project';
import { addWorkingDays, formatDate } from './dateUtils';

// Helper to find the matching control for a CA number and IT element
function findMatchingControl(
  controls: ControlActivity[],
  caNumber: string,
  itElement: 'Application' | 'Operating System' | 'Database'
): ControlActivity | undefined {
  return controls.find(control => 
    control.caNumber === caNumber && 
    control.itElement === itElement
  );
}

export function generateITGCRequests(
  projectId: string,
  applications: EntityDetails[],
  controls: ControlActivity[],
  controlMappings: Record<string, Record<string, boolean>>,
  phases: Phase[]
): ITGCRequest[] {
  const requests: ITGCRequest[] = [];
  const firstPhase = phases[0];
  
  if (!firstPhase) return requests;

  const dueDate = formatDate(addWorkingDays(new Date(firstPhase.startDate), 5));
  const now = new Date().toISOString();

  // Group controls by CA number to handle duplicates
  const uniqueCANumbers = [...new Set(controls.map(c => c.caNumber))].sort((a, b) => {
    const aNum = parseInt(a.replace(/\D/g, ''));
    const bNum = parseInt(b.replace(/\D/g, ''));
    return aNum - bNum;
  });

  // For each unique CA number
  uniqueCANumbers.forEach(caNumber => {
    // For each application
    applications.forEach(app => {
      // Check mappings for this control
      const controlId = controls.find(c => c.caNumber === caNumber)?.id;
      if (!controlId) return;
      
      const mapping = controlMappings[controlId] || {};
      
      // Create requests only for checked IT elements
      if (mapping[`${app.id}-app`]) {
        const matchingControl = findMatchingControl(controls, caNumber, 'Application');
        requests.push(createRequest('Application', app, caNumber, matchingControl, firstPhase, dueDate, now, projectId));
      }
      if (mapping[`${app.id}-os`]) {
        const matchingControl = findMatchingControl(controls, caNumber, 'Operating System');
        requests.push(createRequest('Operating System', app, caNumber, matchingControl, firstPhase, dueDate, now, projectId));
      }
      if (mapping[`${app.id}-db`]) {
        const matchingControl = findMatchingControl(controls, caNumber, 'Database');
        requests.push(createRequest('Database', app, caNumber, matchingControl, firstPhase, dueDate, now, projectId));
      }
    });
  });

  return requests;
}

function createRequest(
  itElement: 'Application' | 'Operating System' | 'Database',
  app: EntityDetails,
  caNumber: string,
  matchingControl: ControlActivity | undefined,
  phase: Phase,
  dueDate: string,
  timestamp: string,
  projectId: string
): ITGCRequest {
  return {
    id: crypto.randomUUID(),
    projectId,
    applicationName: app.applicationName,
    caNumber,
    itElement,
    phase: phase.name,
    requestType: 'Documentation',
    // Use RFI from matching control if found, otherwise use a default message
    rfi: matchingControl?.rfi || 
         matchingControl?.description || 
         `Please provide documentation for ${caNumber} - ${itElement}`,
    dueDate,
    attachments: [],
    clientPOC: '',
    xPOC: '',
    status: 'Open',
    comments: [],
    createdAt: timestamp,
    updatedAt: timestamp
  };
}