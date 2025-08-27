import React from 'react';
import { CheckCircle2, XCircle, Trash2, AlertTriangle, Plus, Edit2 } from 'lucide-react';

interface RecordCardProps {
  title: string;
  recordId: string | null;
  status: 'new' | 'updated' | 'unchanged';
  action?: 'approve' | 'reject' | 'delete' | null;
  isDeleted?: boolean;
  onActionChange: (action: 'approve' | 'reject' | 'delete' | null) => void;
  children: React.ReactNode;
}

export default function RecordCard({
  title,
  recordId,
  status,
  action,
  isDeleted,
  onActionChange,
  children
}: RecordCardProps) {
  const getStatusIcon = () => {
    if (status === 'new') return <Plus className="h-5 w-5 text-green-600" />;
    if (status === 'updated') return <Edit2 className="h-5 w-5 text-blue-600" />;
    return null;
  };

  const getStatusBadge = () => {
    if (status === 'new') return { text: 'NEW', class: 'bg-green-100 text-green-800' };
    if (status === 'updated') return { text: 'UPDATED', class: 'bg-blue-100 text-blue-800' };
    return { text: 'UNCHANGED', class: 'bg-gray-100 text-gray-600' };
  };

  const badge = getStatusBadge();

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border-2 transition-all duration-200
        ${action === 'approve' ? 'border-green-500 shadow-green-100' : ''}
        ${action === 'reject' ? 'border-red-500 shadow-red-100' : ''}
        ${action === 'delete' || isDeleted ? 'border-gray-400 opacity-60' : ''}
        ${!action && !isDeleted ? 'border-gray-200 hover:shadow-md' : ''}
      `}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${badge.class}`}>
                  {badge.text}
                </span>
                {recordId ? (
                  <span className="text-sm text-gray-500">ID: {recordId}</span>
                ) : (
                  <span className="text-sm text-green-600 font-medium">Pending ID Assignment</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onActionChange(action === 'approve' ? null : 'approve')}
              className={`
                p-2 rounded-md transition-all
                ${action === 'approve' 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'text-gray-400 hover:text-green-600 hover:bg-gray-100'
                }
              `}
              title="Approve"
              disabled={isDeleted}
            >
              <CheckCircle2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onActionChange(action === 'reject' ? null : 'reject')}
              className={`
                p-2 rounded-md transition-all
                ${action === 'reject' 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                }
              `}
              title="Reject"
              disabled={isDeleted}
            >
              <XCircle className="h-5 w-5" />
            </button>
            <button
              onClick={() => onActionChange(action === 'delete' || isDeleted ? null : 'delete')}
              className={`
                p-2 rounded-md transition-all
                ${action === 'delete' || isDeleted
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }
              `}
              title="Mark for Deletion"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Action Status */}
        {(action || isDeleted) && (
          <div className="mt-3 flex items-center gap-2">
            {action === 'approve' && (
              <span className="text-sm text-green-700 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Marked for approval
              </span>
            )}
            {action === 'reject' && (
              <span className="text-sm text-red-700 flex items-center gap-1">
                <XCircle className="h-4 w-4" /> Marked for rejection
              </span>
            )}
            {(action === 'delete' || isDeleted) && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Trash2 className="h-4 w-4" /> Marked for deletion
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className={`px-6 py-4 ${isDeleted || action === 'delete' ? 'opacity-50' : ''}`}>
        {children}
      </div>
    </div>
  );
}