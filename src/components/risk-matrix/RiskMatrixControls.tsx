import React from 'react';

export const RAIT_OPTIONS = ['Higher', 'Not Higher'] as const;
export const RAWC_OPTIONS = ['Higher', 'Not Higher'] as const;

interface RiskMatrixControlsProps {
  value: string;
  onChange: (value: string) => void;
  type: 'rait' | 'rawc';
  className?: string;
}

export function RiskMatrixControls({ value, onChange, type, className = '' }: RiskMatrixControlsProps) {
  const options = type === 'rait' ? RAIT_OPTIONS : RAWC_OPTIONS;
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-2 py-1 border rounded text-sm ${className}`}
    >
      <option value="">Select {type.toUpperCase()}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}