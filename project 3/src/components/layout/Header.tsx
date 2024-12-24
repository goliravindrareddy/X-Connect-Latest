import React from 'react';
import { ClipboardList } from 'lucide-react';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">AuditFlow</span>
          </div>
          
          <nav className="flex items-center space-x-8">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">Audits</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">Reports</a>
            </div>
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}