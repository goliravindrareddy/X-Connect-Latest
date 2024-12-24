import React, { useState } from 'react';
import { AuditCard } from '../audit/AuditCard';
import { AuditDetails } from '../audit/AuditDetails';
import type { Audit } from '../../types';

const mockAudits: Audit[] = [
  {
    id: '1',
    title: 'Q1 Financial Review',
    status: 'in-progress',
    dueDate: '2024-03-31',
    priority: 'high',
    assignee: 'John Doe',
    description: 'Comprehensive review of Q1 2024 financial statements and processes',
    findings: [
      {
        id: 'f1',
        title: 'Incomplete Documentation',
        description: 'Several transactions lack proper documentation',
        severity: 'high',
        status: 'open',
        createdAt: '2024-03-01',
        updatedAt: '2024-03-01'
      }
    ],
    attachments: [
      {
        id: 'a1',
        name: 'Financial_Statement_Q1.pdf',
        url: '#',
        type: 'application/pdf',
        size: 2500000,
        uploadedBy: 'John Doe',
        uploadedAt: '2024-03-01'
      }
    ],
    comments: [
      {
        id: 'c1',
        content: 'Initial review completed. Found several issues that need attention.',
        author: {
          id: '1',
          name: 'John Doe',
          role: 'auditor',
          email: 'john@example.com',
          permissions: ['read', 'write']
        },
        createdAt: '2024-03-01',
        updatedAt: '2024-03-01',
        attachments: []
      }
    ],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    department: 'Finance',
    riskLevel: 'high',
    complianceFrameworks: ['SOX', 'GAAP']
  }
  // Add more mock audits as needed
];

export function DashboardGrid() {
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAudits.map((audit) => (
          <AuditCard
            key={audit.id}
            audit={audit}
            onClick={() => setSelectedAudit(audit)}
          />
        ))}
      </div>

      {selectedAudit && (
        <AuditDetails
          audit={selectedAudit}
          onClose={() => setSelectedAudit(null)}
        />
      )}
    </>
  );
}