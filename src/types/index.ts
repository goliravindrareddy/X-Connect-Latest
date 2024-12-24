export interface Audit {
  id: string;
  title: string;
  status: 'planned' | 'in-progress' | 'review' | 'completed';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  description?: string;
  findings: Finding[];
  attachments: Attachment[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high';
  complianceFrameworks: string[];
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'accepted';
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  evidence?: string[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
}

export interface User {
  id: string;
  name: string;
  role: 'auditor' | 'reviewer' | 'admin';
  email: string;
  avatar?: string;
  department?: string;
  permissions: string[];
}