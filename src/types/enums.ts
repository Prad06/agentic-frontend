export type DevelopmentStageEnum =
  | "PRECLINICAL"
  | "PHASE_1"
  | "PHASE_2"
  | "PHASE_3"
  | "APPROVED"
  | "COMMERCIAL"
  | "OTHER"
  | "<unknown>";

export type CatalystStatusEnum =
  | "UPCOMING"
  | "COMPLETED"
  | "DELAYED"
  | "CANCELLED"
  | "OTHER"
  | "<unknown>";

export type ModalityEnum =
  | "SMALL_MOLECULE"
  | "ANTIBODY"
  | "CELL_THERAPY"
  | "GENE_THERAPY"
  | "RNA_THERAPY"
  | "VACCINE"
  | "PROTEIN_THERAPEUTIC"
  | "OTHER"
  | "<unknown>";

export type FormulationEnum =
  | "TABLET"
  | "CAPSULE"
  | "ORAL_SOLUTION"
  | "ORAL_SUSPENSION"
  | "INJECTABLE_SOLUTION"
  | "LYOPHILIZED_POWDER"
  | "INFUSION"
  | "TOPICAL_CREAM"
  | "TOPICAL_OINTMENT"
  | "NASAL_SPRAY"
  | "INHALATION_POWDER"
  | "EYE_DROPS"
  | "SUPPOSITORY"
  | "TRANSDERMAL_PATCH"
  | "SUBCUTANEOUS_IMPLANT"
  | "OTHER"
  | "<unknown>";

export type RouteOfAdministrationEnum =
  | "ORAL"
  | "INTRAVENOUS"
  | "SUBCUTANEOUS"
  | "INTRAMUSCULAR"
  | "INTRADERMAL"
  | "TOPICAL"
  | "TRANSDERMAL"
  | "INTRANASAL"
  | "INHALATION"
  | "RECTAL"
  | "INTRAVITREAL"
  | "SUBCHOROIDAL"
  | "INTRATHECAL"
  | "INTRACAMERAL"
  | "OTHER"
  | "<unknown>";

export type CatalystCategoryEnum =
  | "P1_INITIATION"
  | "P1_EC"
  | "P1_READOUT"
  | "P2_INITIATION"
  | "P2_EC"
  | "P2_READOUT"
  | "P3_INITIATION"
  | "P3_EC"
  | "P3_READOUT"
  | "EX_US_REGULATORY"
  | "PDUFA_ADCOM"
  | "OTHER_REGULATORY"
  | "LEGAL"
  | "COMMERCIAL"
  | "CORPORATE"
  | "M_AND_A"
  | "FINANCING"
  | "CMC"
  | "MISC"
  | "TRIAL_INITIATION"
  | "READTHROUGH"
  | "PRECLINICAL"
  | "OTHER"
  | "<unknown>";

export type IndicationClinicalTrialsStatusEnum =
  | "ACTIVE"
  | "DISCONTINUED"
  | "PAUSED"
  | "COMPLETED"
  | "OTHER"
  | "<unknown>";

export type TherapeuticAreaEnum =
  | "ONCOLOGY"
  | "IMMUNOLOGY"
  | "CARDIOVASCULAR"
  | "METABOLIC"
  | "CENTRAL_NERVOUS_SYSTEM"
  | "ENDOCRINE"
  | "GASTROINTESTINAL"
  | "HEMATOLOGY"
  | "INFECTIOUS_DISEASE"
  | "MUSCULOSKELETAL"
  | "RENAL"
  | "RESPIRATORY"
  | "UROLOGY"
  | "DERMATOLOGY"
  | "OPHTHALMOLOGY"
  | "NEUROLOGY"
  | "OTHER"
  | "<unknown>";