import { useForm, useFieldArray } from 'react-hook-form';
import type { IndicationRecord, ReviewJob } from '../../types/review';
import DiffField from '../common/DiffField';
import RecordCard from '../common/RecordCard';
import ReviewHeader from '../common/ReviewHeader';

const THERAPEUTIC_AREA_VALUES = [
  "ONCOLOGY",
  "IMMUNOLOGY",
  "CARDIOVASCULAR",
  "METABOLIC",
  "CENTRAL_NERVOUS_SYSTEM",
  "ENDOCRINE",
  "GASTROINTESTINAL",
  "HEMATOLOGY",
  "INFECTIOUS_DISEASE",
  "MUSCULOSKELETAL",
  "RENAL",
  "RESPIRATORY",
  "UROLOGY",
  "DERMATOLOGY",
  "OPHTHALMOLOGY",
  "NEUROLOGY",
  "OTHER",
  "<unknown>"
];
const DEVELOPMENT_STAGE_VALUES = [
  "PRECLINICAL",
  "PHASE_1",
  "PHASE_2",
  "PHASE_3",
  "APPROVED",
  "COMMERCIAL",
  "OTHER",
  "<unknown>"
];
const CLINICAL_TRIALS_STATUS_VALUES = [
  "ACTIVE",
  "DISCONTINUED",
  "PAUSED",
  "COMPLETED",
  "OTHER",
  "<unknown>"
];

interface IndicationReviewFormProps {
  reviewData: ReviewJob;
  onSubmit: (data: any) => void;
}

export default function IndicationReviewForm({ reviewData, onSubmit }: IndicationReviewFormProps) {
  const { control, handleSubmit } = useForm({ 
    defaultValues: { 
      decision: 'Approve',
      records: reviewData.records 
    } 
  });
  
  const { fields, update } = useFieldArray({ control, name: 'records' });

  const updateField = (index: number, fieldName: string, value: any) => {
    const record = fields[index] as IndicationRecord;
    update(index, {
      ...record,
      [fieldName]: { ...record[fieldName], current: value }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ReviewHeader
        ticker={reviewData.ticker}
        flowRunId={reviewData.id}
        reasoning={reviewData.reasoning}
        stats={reviewData.stats}
      />
      
      {fields.map((field, index) => {
        const record = field as IndicationRecord;
        return (
          <RecordCard
            key={record._id}
            title={record.indication_name.current}
            recordId={record.indication_id}
            status={record.status}
          >
            <DiffField
              label="Indication ID"
              fieldName="indication_id"
              value={{ current: record.indication_id, previous: null }}
              status={record.status}
              isEditable={false}
            />
            
            <DiffField
              label="Asset ID"
              fieldName="asset_id"
              value={{ current: record.asset_id, previous: null }}
              status={record.status}
              isEditable={false}
            />
            
            <DiffField
              label="Indication Name"
              fieldName="indication_name"
              value={record.indication_name}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_name', val)}
            />
            
            <DiffField
              label="ICD-10 Code"
              fieldName="indication_icd_10_code"
              value={record.indication_icd_10_code}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_icd_10_code', val)}
            />
            
            <DiffField
              label="MeSH Code"
              fieldName="indication_MeSH_code"
              value={record.indication_MeSH_code}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_MeSH_code', val)}
            />
            
            <DiffField
              label="Therapeutic Area"
              fieldName="indication_therapeutic_area"
              value={record.indication_therapeutic_area}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_therapeutic_area', val)}
              options={THERAPEUTIC_AREA_VALUES.map(v => ({ value: v, label: v }))}
            />
            
            <DiffField
              label="Is Primary"
              fieldName="indication_is_primary"
              value={record.indication_is_primary}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_is_primary', val)}
            />
            
            <DiffField
              label="Development Stage"
              fieldName="indication_development_stage"
              value={record.indication_development_stage}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_development_stage', val)}
              options={DEVELOPMENT_STAGE_VALUES.map(v => ({ value: v, label: v }))}
            />
            
            <DiffField
              label="Development Stage Date"
              fieldName="indication_development_stage_date"
              value={record.indication_development_stage_date}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_development_stage_date', val)}
            />
            
            <DiffField
              label="Clinical Trials Status"
              fieldName="indication_clinical_trials_status"
              value={record.indication_clinical_trials_status}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_clinical_trials_status', val)}
              options={CLINICAL_TRIALS_STATUS_VALUES.map(v => ({ value: v, label: v }))}
            />
            
            <DiffField
              label="Notes"
              fieldName="indication_notes"
              value={record.indication_notes}
              status={record.status}
              onChange={(val) => updateField(index, 'indication_notes', val)}
            />
          </RecordCard>
        );
      })}
      
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <div className="flex gap-3">
          <button
            type="submit"
            name="decision"
            value="Reject"
            className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
          >
            Reject All
          </button>
          <button
            type="submit"
            name="decision"
            value="Approve"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Approve & Save
          </button>
        </div>
      </div>
    </form>
  );
}