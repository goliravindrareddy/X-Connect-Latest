import React from 'react';
import { SOC2MatrixTable } from './soc2/SOC2MatrixTable';
import { SOC1MatrixTable } from './soc1/SOC1MatrixTable';

interface RiskMatrixTableProps {
  socType: 'SOC1' | 'SOC2' | '';
  projectId: string;
}

export function RiskMatrixTable({ socType, projectId }: RiskMatrixTableProps) {
  if (!socType) return null;

  return socType === 'SOC2' ? (
    <SOC2MatrixTable projectId={projectId} />
  ) : (
    <SOC1MatrixTable projectId={projectId} />
  );
}