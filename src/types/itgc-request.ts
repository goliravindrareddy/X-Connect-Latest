import type { Attachment, Comment } from './index';

export interface ITGCRequest {
  id: string;
  projectId: string;
  applicationName: string;
  caNumber: string;
  itElement: 'Application' | 'Operating System' | 'Database' | '';
  phase: string;
  requestType: 'Documentation' | 'Evidence' | 'Walkthrough' | 'Other';
  rfi: string;
  dueDate: string;
  attachments: Attachment[];
  clientPOC: string;
  xPOC: string;
  status: 'Open' | 'In Progress' | 'Client Submitted' | 'Closed';
  statusChangedAt?: string;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}