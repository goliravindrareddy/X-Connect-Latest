import React from 'react';
import { Sparkles } from 'lucide-react';

export function NewTag() {
  return (
    <div className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
      <Sparkles className="h-3 w-3 mr-1" />
      New
    </div>
  );
}