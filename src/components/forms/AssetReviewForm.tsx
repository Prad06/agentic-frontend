import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import type { AssetRecord, ReviewJob } from '../../types/review';
import DiffField from '../common/DiffField';
import RecordCard from '../common/RecordCard';
import ReviewHeader from '../common/ReviewHeader';

const MODALITY_VALUES = [ "SMALL_MOLECULE", "ANTIBODY", "CELL_THERAPY", "GENE_THERAPY", "RNA_THERAPY", "VACCINE", "PROTEIN_THERAPEUTIC", "OTHER", "<unknown>" ];
const FORMULATION_VALUES = [ "TABLET", "CAPSULE", "ORAL_SOLUTION", "ORAL_SUSPENSION", "INJECTABLE_SOLUTION", "LYOPHILIZED_POWDER", "INFUSION", "TOPICAL_CREAM", "TOPICAL_OINTMENT", "NASAL_SPRAY", "INHALATION_POWDER", "EYE_DROPS", "SUPPOSITORY", "TRANSDERMAL_PATCH", "SUBCUTANEOUS_IMPLANT", "OTHER", "<unknown>" ];
const ROUTE_VALUES = [ "ORAL", "INTRAVENOUS", "SUBCUTANEOUS", "INTRAMUSCULAR", "INTRADERMAL", "TOPICAL", "TRANSDERMAL", "INTRANASAL", "INHALATION", "RECTAL", "INTRAVITREAL", "SUBCHOROIDAL", "INTRATHECAL", "INTRACAMERAL", "OTHER", "<unknown>" ];

interface AssetReviewFormProps {
  reviewData: ReviewJob;
  onSubmit: (data: any) => void;
}

export default function AssetReviewForm({ reviewData, onSubmit }: AssetReviewFormProps) {
  const navigate = useNavigate();
  const [records, setRecords] = useState<AssetRecord[]>(
    reviewData.records.map(r => ({ ...r, _action: null, _isDeleted: false })) as AssetRecord[]
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('Records state updated:', records);
  }, [records]);

  const selection = useMemo(() => {
    return records.reduce(
      (acc, record) => ({
        approved: acc.approved + (record._action === 'approve' ? 1 : 0),
        rejected: acc.rejected + (record._action === 'reject' ? 1 : 0),
        deleted: acc.deleted + (record._action === 'delete' || record._isDeleted ? 1 : 0),
      }),
      { approved: 0, rejected: 0, deleted: 0 }
    );
  }, [records]);

  const handleRecordAction = (index: number, action: 'approve' | 'reject' | 'delete' | null) => {
    const newRecords = [...records];
    newRecords[index] = {
      ...newRecords[index],
      _action: action,
      _isDeleted: action === 'delete'
    };
    setRecords(newRecords);
  };

  const updateField = (index: number, fieldName: string, value: any) => {
    setRecords(prevRecords => {
      const newRecords = [...prevRecords];
      const currentField = newRecords[index][fieldName as keyof AssetRecord] as any;
      newRecords[index] = {
        ...newRecords[index],
        [fieldName]: {
          previous: currentField?.previous || currentField?.current || null,
          current: value
        }
      };
      return newRecords;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const submissionData = {
      reviewId: reviewData.id,
      category: reviewData.category,
      ticker: reviewData.ticker,
      records: records.map(record => ({
        ...record,
        _markedForDeletion: record._action === 'delete' || record._isDeleted
      }))
    };

    try {
      await onSubmit(submissionData);
      navigate('/analysis/asset');
    } catch (error) {
      console.error('Submission error:', error);
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <ReviewHeader
        ticker={reviewData.ticker}
        flowRunId={reviewData.id}
        reasoning={reviewData.reasoning}
        stats={reviewData.stats}
        selection={selection}
        onBulkAction={(action) =>
          setRecords(records.map(r => ({
            ...r,
            _action: action,
            _isDeleted: action === 'delete'
          })))
        }
      />

      <div className="space-y-6">
        {records.map((record, index) => (
          <RecordCard
            key={record._id}
            title={record.asset_primary_name.current}
            recordId={record.asset_id}
            status={record.status}
            action={record._action}
            isDeleted={record._isDeleted}
            onActionChange={(action) => handleRecordAction(index, action)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DiffField label="Internal Code" fieldName="asset_internal_code"
                value={record.asset_internal_code} status={record.status}
                isDisabled={record._isDeleted} onChange={(val) => updateField(index, 'asset_internal_code', val)} />
              <DiffField label="Primary Name" fieldName="asset_primary_name"
                value={record.asset_primary_name} status={record.status}
                isDisabled={record._isDeleted} onChange={(val) => updateField(index, 'asset_primary_name', val)} />
              <DiffField label="Modality" fieldName="asset_modality"
                value={record.asset_modality} status={record.status}
                isDisabled={record._isDeleted}
                options={MODALITY_VALUES.map(v => ({ value: v, label: v }))}
                onChange={(val) => updateField(index, 'asset_modality', val)} />
              <DiffField label="Target" fieldName="asset_target"
                value={record.asset_target} status={record.status}
                isDisabled={record._isDeleted} onChange={(val) => updateField(index, 'asset_target', val)} />
              <DiffField label="Formulation" fieldName="asset_formulation"
                value={record.asset_formulation} status={record.status}
                isDisabled={record._isDeleted}
                options={FORMULATION_VALUES.map(v => ({ value: v, label: v }))}
                onChange={(val) => updateField(index, 'asset_formulation', val)} />
              <DiffField label="Route of Administration" fieldName="asset_route_of_administration"
                value={record.asset_route_of_administration} status={record.status}
                isDisabled={record._isDeleted}
                options={ROUTE_VALUES.map(v => ({ value: v, label: v }))}
                onChange={(val) => updateField(index, 'asset_route_of_administration', val)}
                helpText="How the medication is administered" />
            </div>
          </RecordCard>
        ))}
      </div>

      <div className="mt-8 sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button type="submit" disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50">
            {isSaving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
