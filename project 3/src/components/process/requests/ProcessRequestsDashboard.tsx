import React from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import type { ProcessRequest } from '../../../types/process';

interface ProcessRequestsDashboardProps {
  requests: ProcessRequest[];
}

export function ProcessRequestsDashboard({ requests }: ProcessRequestsDashboardProps) {
  const metrics = {
    status: {
      open: requests.filter(r => r.status === 'Open').length,
      inProgress: requests.filter(r => r.status === 'In Progress').length,
      submitted: requests.filter(r => r.status === 'Client Submitted').length,
      closed: requests.filter(r => r.status === 'Closed').length
    },
    frequency: {
      daily: requests.filter(r => r.frequency === 'Daily').length,
      weekly: requests.filter(r => r.frequency === 'Weekly').length,
      monthly: requests.filter(r => r.frequency === 'Monthly').length,
      quarterly: requests.filter(r => r.frequency === 'Quarterly').length,
      annually: requests.filter(r => r.frequency === 'Annually').length
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Status Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Status Overview</h3>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Open</span>
            <span className="text-sm font-medium">{metrics.status.open}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">In Progress</span>
            <span className="text-sm font-medium">{metrics.status.inProgress}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Submitted</span>
            <span className="text-sm font-medium">{metrics.status.submitted}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Closed</span>
            <span className="text-sm font-medium">{metrics.status.closed}</span>
          </div>
        </div>
      </div>

      {/* Frequency Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Frequency Distribution</h3>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Daily</span>
            <span className="text-sm font-medium">{metrics.frequency.daily}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Weekly</span>
            <span className="text-sm font-medium">{metrics.frequency.weekly}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monthly</span>
            <span className="text-sm font-medium">{metrics.frequency.monthly}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Quarterly</span>
            <span className="text-sm font-medium">{metrics.frequency.quarterly}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Annually</span>
            <span className="text-sm font-medium">{metrics.frequency.annually}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Progress Overview</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  {requests.length > 0 ? Math.round((metrics.status.closed / requests.length) * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{ width: `${requests.length > 0 ? (metrics.status.closed / requests.length) * 100 : 0}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900">Completion Summary</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-gray-900">
            {metrics.status.closed}
            <span className="text-sm font-normal text-gray-500 ml-2">of {requests.length}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Requests completed</p>
          <div className="mt-4">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {requests.length > 0 ? Math.round((metrics.status.closed / requests.length) * 100) : 0}% Complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}