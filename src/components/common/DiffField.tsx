import React, { useState, useEffect } from 'react';
import { Edit2, Check, X, Info } from 'lucide-react';
import type { FieldValue } from '../../types/review';

interface DiffFieldProps<T = string> {
  label: string;
  fieldName: string;
  value: FieldValue<T>;
  status: 'new' | 'updated' | 'unchanged';
  isEditable?: boolean;
  isDisabled?: boolean;
  onChange?: (newValue: T) => void;
  options?: { value: T; label: string }[];
  helpText?: string;
}

export default function DiffField<T = string>({
  label,
  fieldName,
  value,
  status,
  isEditable = true,
  isDisabled = false,
  onChange,
  options,
  helpText
}: DiffFieldProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.current); // case 1

  useEffect(() => {
    setTempValue(value.current);
  }, [value.current]);

  const hasChanged = status === 'updated' && value.previous !== value.current;
  const isNew = status === 'new';

  const handleCancel = () => {
    setTempValue(value.current); // revert
    setIsEditing(false);
  };

  const renderEditMode = () => {
    if (options) {
      return (
        <select
          value={String(tempValue)}
          onChange={(e) => {
            const newVal = e.target.value as T;
            setTempValue(newVal);
            onChange?.(newVal);
          }}
          className="w-full px-3 py-1.5 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoFocus
        >
          {options.map(opt => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (typeof value.current === 'boolean') {
      return (
        <input
          type="checkbox"
          checked={tempValue as boolean}
          onChange={(e) => {
            const newVal = e.target.checked as T;
            setTempValue(newVal);
            onChange?.(newVal);
          }}
          className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
      );
    }

    return (
      <input
        type="text"
        value={String(tempValue)}
        onChange={(e) => {
          const newVal = e.target.value as T;
          setTempValue(newVal);
          onChange?.(newVal);
        }}
        className="w-full px-3 py-1.5 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        autoFocus
      />
    );
  };

  const renderViewMode = () => {
    if (typeof value.current === 'boolean') {
      return (
        <span className={`font-medium ${value.current ? 'text-green-600' : 'text-gray-500'}`}>
          {value.current ? 'Yes' : 'No'}
        </span>
      );
    }
    return <span className="font-medium text-gray-900">{String(value.current) || '—'}</span>;
  };

  return (
    <div
      className={`
        py-3 px-4 rounded-lg transition-all
        ${hasChanged ? 'bg-blue-50 border border-blue-200' : ''}
        ${isNew ? 'bg-green-50 border border-green-200' : ''}
        ${!hasChanged && !isNew ? 'bg-gray-50' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <code className="text-xs text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
              {fieldName}
            </code>
            {helpText && (
              <div className="group relative">
                <Info className="h-3.5 w-3.5 text-gray-400" />
                <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap">
                  {helpText}
                </div>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              {renderEditMode()}
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-green-600 hover:bg-green-100 rounded"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 text-red-600 hover:bg-red-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                {renderViewMode()}
                {hasChanged && value.previous != null && (
                  <div className="text-xs text-blue-600 mt-0.5">
                    Previously: {String(value.previous)}
                  </div>
                )}
              </div>
              {isEditable && !isDisabled && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
