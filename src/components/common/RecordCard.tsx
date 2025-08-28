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

  const [pendingAction, setPendingAction] = React.useState<'delete' | null>(
    action === 'delete' ? 'delete' : null
  );

  React.useEffect(() => {
    setPendingAction(action === 'delete' ? 'delete' : null);
  }, [action]);

  const handleDeleteToggle = () => {
    console.log('Toggling delete action');
    const newAction = pendingAction === 'delete' ? null : 'delete';
    setPendingAction(newAction);
    onActionChange(newAction);
  };

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border-2 transition-all duration-200
        ${pendingAction === 'delete' || isDeleted ? 'border-gray-400 opacity-60' : ''}
        ${!pendingAction && !isDeleted ? 'border-gray-200 hover:shadow-md' : ''}
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
          {/* Delete Button Only */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDeleteToggle}
              className={`
                p-2 rounded-md transition-all flex items-center gap-2
                ${pendingAction === 'delete' || isDeleted
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }
              `}
              title="Mark for Deletion"
            >
              <Trash2 className="h-5 w-5" />
              <span className="text-sm">
                {pendingAction === 'delete' || isDeleted ? 'Marked for Deletion' : 'Delete'}
              </span>
            </button>
          </div>
        </div>
        {/* Status message for non-deleted items */}
        {!pendingAction && !isDeleted && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Will be approved with any changes
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className={`px-6 py-4 ${isDeleted || pendingAction === 'delete' ? 'opacity-50' : ''}`}>
        {children}
      </div>
    </div>
  );
}