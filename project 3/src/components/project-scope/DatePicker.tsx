import React from 'react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  required?: boolean;
  min?: string;
  max?: string;
}

export function DatePicker({ 
  label, 
  value = '', // Provide default empty string to prevent uncontrolled to controlled warning
  onChange,
  error,
  required = false,
  min,
  max
}: DatePickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        required={required}
        className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}