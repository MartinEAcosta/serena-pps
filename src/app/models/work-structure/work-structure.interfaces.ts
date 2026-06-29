import { ActionableListItem } from "@shared/components/actionable-list/actionable-list.component";
export interface JobPositionData {
  id?: string;
  sector_name: string;
  sector_activity_code: string | number;
  sector_activity_additional_description: string;

  job_position: string;
  job_activity_code: string | number;
  job_activity_additional_description: string;
}

export interface JobPositionRelationData {
  id?: string;
  job_position_id: string;
  employment_mode_code: string | number;
  protection_elements: (string | number)[];
  quantity: number;
  unit_of_quantity: string | number;

  sector_name?: string;
  job_position?: string;
}

// Para la lista de "Sectores y Puestos" (work-structure)
// Omit<'id'> + ActionableListItem.id sobreescribe el id opcional por uno requerido
export interface JobPositionListItem extends Omit<JobPositionData, 'id'>, ActionableListItem {}

// Para la lista de relaciones sustancia-puesto (carcinogenic-agents)
export interface JobPositionRelationListItem extends ActionableListItem {
  relation: JobPositionRelationData;
}

export interface WorkStructureData {
  own_administrative_workers_count: number;
  own_production_workers_count: number;
  temporary_service_administrative_workers_count: number;
  temporary_service_production_workers_count: number;
  job_positions: JobPositionData[];
}
export interface WorkStructureData {
    own_administrative_workers_count : number;
    own_production_workers_count : number;
    temporary_service_administrative_workers_count : number;
    temporary_service_production_workers_count : number;
    job_positions : JobPositionData[];
}