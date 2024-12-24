export interface ControlObjective {
  id: string;
  coNumber: string;
  description: string;
  testingType: 'ITGC' | 'Process' | '';
  controlActivities: ControlActivity[];
}

export interface ControlActivity {
  id: string;
  caNumber: string;
  description: string;
  itElement: '' | 'Application' | 'Operating System' | 'Database';
  rfi: string;
  rait: string;
  rawc: string;
  assertions: string[];
}

export interface SOC2ControlActivity {
  id: string;
  caNumber: string;
  description: string;
  testingType: 'ITGC' | 'Process' | '';
  tscNumber: string;
  rfi: string;
  rait: string;
  rawc: string;
}

export interface SOC2RiskMatrix {
  projectId: string;
  controlActivities: SOC2ControlActivity[];
}