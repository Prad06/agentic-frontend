import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

interface ReviewHeaderProps {
  ticker: string;
  flowRunId: string;
  reasoning: string;
  stats: {
    new: number;
    updated: number;
    total: number;
  };
  selection: {
    approved: number;
    rejected: number;
    deleted: number;
  };
  onBulkAction: (action: 'approve' | 'reject' | 'delete') => void;
}

export default function ReviewHeader({ 
  ticker, 
  flowRunId, 
  reasoning, 
  stats,
  selection,
  onBulkAction
}: ReviewHeaderProps) {
  const totalSelected = selection.approved + selection.deleted;
  
  return (
    <div className="mb-6 space-y-4">
      {/* Alert Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-amber-900 mb-1">Review Required</h2>
            <p className="text-sm text-amber-800">{reasoning}</p>
          </div>
        </div>
      </div>
      
      {/* Info Grid */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Ticker</span>
            <p className="font-semibold text-gray-900">{ticker}</p>
          </div>
          <div>
            <span className="text-gray-500">Flow Run</span>
            <p className="font-mono text-xs text-gray-700">{flowRunId.slice(0, 8)}...</p>
          </div>
          <div>
            <span className="text-gray-500">Records</span>
            <p className="font-semibold">
              <span className="text-green-600">{stats.new} new</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-blue-600">{stats.updated} updated</span>
            </p>
          </div>
          <div>
            <span className="text-gray-500">Status</span>
            <p className="font-semibold">
              {selection.approved > 0 && (
                <span className="text-green-600">{selection.approved} to approve</span>
              )}
              {selection.approved > 0 && selection.deleted > 0 && (
                <span className="text-gray-400 mx-1">•</span>
              )}
              {selection.deleted > 0 && (
                <span className="text-red-600">{selection.deleted} to delete</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Simplified Bulk Actions - Delete All Only */}
      {selection.deleted < stats.total && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-blue-900">
              Bulk Actions
              <span className="ml-2 text-blue-700">
                ({selection.approved} will be approved, {selection.deleted} marked for deletion)
              </span>
            </p>
            <button
              onClick={() => onBulkAction('delete')}
              className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Delete All Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
}