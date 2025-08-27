export interface FieldValue<T = string> {
  current: T;
  previous?: T | null;
}

export interface BaseRecord {
  _id: string;
  status: 'new' | 'updated' | 'unchanged';
  _action?: 'approve' | 'reject' | 'delete' | null;
  _isDeleted?: boolean;
}

export interface AssetRecord extends BaseRecord {
  asset_id: string | null;
  asset_internal_code: FieldValue;
  asset_primary_name: FieldValue;
  asset_modality: FieldValue;
  asset_target: FieldValue;
  asset_formulation: FieldValue;
  asset_route_of_administration: FieldValue;
  asset_mechanism_of_action: FieldValue;
  asset_administration_frequency: FieldValue;
  asset_ownership_type: FieldValue;
  asset_is_oncology: FieldValue<boolean>;
  asset_is_active: FieldValue<boolean>;
}

export interface IndicationRecord extends BaseRecord {
  indication_id: string | null;
  asset_id: string;
  indication_name: FieldValue;
  indication_icd_10_code: FieldValue;
  indication_MeSH_code: FieldValue;
  indication_therapeutic_area: FieldValue;
  indication_is_primary: FieldValue<boolean>;
  indication_development_stage: FieldValue;
  indication_development_stage_date: FieldValue;
  indication_clinical_trials_status: FieldValue;
  indication_notes: FieldValue;
}

export interface CatalystRecord extends BaseRecord {
  catalyst_id: string | null;
  asset_id: string;
  indication_id: string | string[] | null;
  catalyst_name: FieldValue;
  catalyst_description: FieldValue;
  catalyst_category: FieldValue;
  catalyst_guided_timeframe: FieldValue;
  catalyst_quarter_year: FieldValue;
  catalyst_status: FieldValue;
  catalyst_reasoning: FieldValue;
}

export interface ReviewJob {
  id: string;
  ticker: string;
  category: 'asset' | 'indication' | 'catalyst';
  reasoning: string;
  records: (AssetRecord | IndicationRecord | CatalystRecord)[];
  stats: {
    new: number;
    updated: number;
    total: number;
  };
}