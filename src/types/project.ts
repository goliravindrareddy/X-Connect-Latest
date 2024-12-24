export interface ProjectScope {
  id: string;
  groupName: string;
  reportName: string;
  startDate: string;
  endDate: string;
  reportIssuanceDate: string;
  phases: Phase[];
  auditType: AuditType;
  status: 'active' | 'completed' | 'on-hold';
}

export interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  rfiRequestStartDate: string;
}

export interface AuditType {
  socType: '' | 'SOC1' | 'SOC2';
  reportType: '' | 'Type1' | 'Type2';
}