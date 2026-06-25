
export interface JobPositionData {
    sector_name : string;
    sector_activity_code : number;
    sector_activity_description : string;
    sector_activity_additional_description : string;
    job_position : string;
    job_activity_code : number;
    job_activity_description : string;
    job_activity_additional_description : string;
}

export interface WorkStructureData {
    own_administrative_workers_count : number;
    own_production_workers_count : number;
    temporary_service_administrative_workers_count : number;
    temporary_service_production_workers_count : number;
    job_positions : JobPositionData[];
}