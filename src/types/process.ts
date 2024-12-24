import type { Attachment, Comment } from './index';

export interface ProcessControl {
  id: string;
  applicationName: string;
  caNumber: string;
  controlActivity: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
  sampleSize: number;
  testingApproach: string;
}

export interface ProcessRequest {
  id: string;
  projectId: string;
  applicationName: string;
  caNumber: string;
  phase: string;
  frequency: ProcessControl['frequency'];
  sampleSize: number;
  period: string;
  requestType: 'Documentation' | 'Evidence' | 'Walkthrough';
  description: string;
  dueDate: string;
  attachments: Attachment[];
  clientPOC: string;
  status: 'Open' | 'In Progress' | 'Client Submitted' | 'Closed';
  statusChangedAt?: string;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}