import React from 'react';
import { Calendar } from 'lucide-react';

interface ExaminationPeriodProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  errors: Record<string, string>;
}

export function ExaminationPeriod({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  errors
}: ExaminationPeriodProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Calendar className="inline h-4 w-4 mr-2" />
        Examination Period
      </label>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>
        <div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        The examination period must be at least 3 months
      </p>
    </div>
  );
}