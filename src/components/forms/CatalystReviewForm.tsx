import { useForm, useFieldArray } from 'react-hook-form';
import type { CatalystRecord, ReviewJob } from '../../types/review';
import DiffField from '../common/DiffField';
import RecordCard from '../common/RecordCard';
import ReviewHeader from '../common/ReviewHeader';

const CATALYST_CATEGORY_VALUES = [
  "P1_INITIATION",
  "P1_EC",
  "P1_READOUT",
  "P2_INITIATION",
  "P2_EC",
  "P2_READOUT",
  "P3_INITIATION",
  "P3_EC",
  "P3_READOUT",
  "EX_US_REGULATORY",
  "PDUFA_ADCOM",
  "OTHER_REGULATORY",
  "LEGAL",
  "COMMERCIAL",
  "CORPORATE",
  "M_AND_A",
  "FINANCING",
  "CMC",
  "MISC",
  "TRIAL_INITIATION",
  "READTHROUGH",
  "PRECLINICAL",
  "OTHER",
  "<unknown>"
];
const CATALYST_STATUS_VALUES = [
  "UPCOMING",
  "COMPLETED",
  "DELAYED",
  "CANCELLED",
  "OTHER",
  "<unknown>"
];

interface CatalystReviewFormProps {
  reviewData: ReviewJob;
  onSubmit: (data: any) => void;
}

export default function CatalystReviewForm({ reviewData, onSubmit }: CatalystReviewFormProps) {
  const { control, handleSubmit } = useForm({ 
    defaultValues: { 
      decision: 'Approve',
      records: reviewData.records 
    } 
  });
  
  const { fields, update } = useFieldArray({ control, name: 'records' });

  const updateField = (index: number, fieldName: string, value: any) => {
    const record = fields[index] as CatalystRecord;
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
        const record = field as CatalystRecord;
        return (
          <RecordCard
            key={record._id}
            title={record.catalyst_name.current}
            recordId={record.catalyst_id}
            status={record.status}
          >
            <DiffField
              label="Catalyst ID"
              fieldName="catalyst_id"
              value={{ current: record.catalyst_id, previous: null }}
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
              label="Indication ID(s)"
              fieldName="indication_id"
              value={{ current: record.indication_id, previous: null }}
              status={record.status}
              isEditable={false}
            />
            
            <DiffField
              label="Catalyst Name"
              fieldName="catalyst_name"
              value={record.catalyst_name}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_name', val)}
            />
            
            <DiffField
              label="Description"
              fieldName="catalyst_description"
              value={record.catalyst_description}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_description', val)}
            />
            
            <DiffField
              label="Category"
              fieldName="catalyst_category"
              value={record.catalyst_category}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_category', val)}
              options={CATALYST_CATEGORY_VALUES.map(v => ({ value: v, label: v }))}
            />
            
            <DiffField
              label="Guided Timeframe"
              fieldName="catalyst_guided_timeframe"
              value={record.catalyst_guided_timeframe}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_guided_timeframe', val)}
            />
            
            <DiffField
              label="Quarter/Year"
              fieldName="catalyst_quarter_year"
              value={record.catalyst_quarter_year}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_quarter_year', val)}
            />
            
            <DiffField
              label="Status"
              fieldName="catalyst_status"
              value={record.catalyst_status}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_status', val)}
              options={CATALYST_STATUS_VALUES.map(v => ({ value: v, label: v }))}
            />
            
            <DiffField
              label="Reasoning"
              fieldName="catalyst_reasoning"
              value={record.catalyst_reasoning}
              status={record.status}
              onChange={(val) => updateField(index, 'catalyst_reasoning', val)}
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