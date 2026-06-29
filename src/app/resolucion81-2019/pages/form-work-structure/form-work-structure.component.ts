import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSectionComponent } from "../../../forms/components/form-section/form-section.component";
import { AddButtonComponent } from "@shared/components/add-button/add-button.component";
import { JobPositionComponent } from "../../components/job-position/job-position.component";
import { FormNavigationBtnsComponent } from "@shared/components/form-navigation-btns/form-navigation-btns.component";
import { FormWizardService } from '../../../form-wizard.service';
import { BtnBasicComponent } from "@shared/components/btn-basic/btn-basic.component";
import { ActionableListComponent } from "@shared/components/actionable-list/actionable-list.component";
import { JobPositionData, JobPositionListItem, JobPositionRelationListItem } from '@models/work-structure/work-structure.interfaces';
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";
import { WorkStructureStoreService } from '../../service/work-structure-store.service';

@Component({
  selector: 'app-form-work-structure',
  imports: [ReactiveFormsModule, FormSectionComponent, AddButtonComponent, JobPositionComponent, FormNavigationBtnsComponent, BtnBasicComponent, ActionableListComponent, LabelErrorComponent],
  templateUrl: './form-work-structure.component.html',
  styleUrl: './form-work-structure.component.scss'
})
export class FormWorkStructureComponent implements OnInit{
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private wizardService = inject(FormWizardService);
  workStructureStore = inject(WorkStructureStoreService);

  workStructureForm : FormGroup = this.fb.group({
    own_administrative_workers_count: [ '', [ Validators.min(0)] ],
    own_production_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_administrative_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_production_workers_count: [ '', [ Validators.min(0)] ],
    
    job_position: this.buildJobPositionForm(),
  });

  readonly jobPositionRelations = computed<JobPositionListItem[]>(() =>
    this.workStructureStore.jobPositions().map((jp) => ({
      ...jp,
      id: jp.id!,
      label: `${jp.sector_name} - ${jp.job_position}`,
    })),
  );

  readonly selectedJobPositionItem = computed<JobPositionListItem | null>(() => {
    const selectedId = this.workStructureStore.selectedJobPosition()?.id;
    if (!selectedId) return null;
    return this.jobPositionRelations().find((item) => item.id === selectedId) ?? null;
  });

  constructor () {}

  get jobPositionForm(): FormGroup {
   return this.workStructureForm.get('job_position') as FormGroup;
  }
 
  ngOnInit(): void {
    const savedData = this.wizardService.getStep('workStructure');
    if (savedData) {
      if (savedData.job_positions && savedData.job_positions.length > 0) {
        const positions : JobPositionData[] = []; 
        savedData.job_positions.forEach(position => {
          positions.push( position );
        });
        this.workStructureStore.loadJobPositions( positions );
      }

      this.workStructureForm.patchValue({
        own_administrative_workers_count: savedData.own_administrative_workers_count,
        own_production_workers_count: savedData.own_production_workers_count,
        temporary_service_administrative_workers_count: savedData.temporary_service_administrative_workers_count,
        temporary_service_production_workers_count: savedData.temporary_service_production_workers_count,
      });
    }
  }

  onSelectJobPosition ( itemId : string ) {
    this.workStructureStore.selectJobPostionById( itemId );
    const pos = this.workStructureStore.selectedJobPosition( )
    if( pos ){
      this.patchValuesJobPositionForm(pos)
    }
  }

  public patchValuesJobPositionForm( item : JobPositionData ) : void{
    this.jobPositionForm.patchValue({
      sector_name: item.sector_name,
      sector_activity_code: item.sector_activity_code,
      sector_activity_additional_description: item.sector_activity_additional_description,

      job_position: item.job_position,
      job_activity_code: item.job_activity_code,
      job_activity_additional_description: item.job_activity_additional_description,
    })
  }

  public buildJobPositionForm() : FormGroup {
    return this.fb.group({
      sector_name: ['', [Validators.required , Validators.minLength(3)]],
      sector_activity_code: ['', [ Validators.required ]],
      sector_activity_additional_description: ['', ],

      job_position: ['', [ Validators.required, Validators.minLength(3)]],
      job_activity_code: ['', [ Validators.required ]],
      job_activity_additional_description: ['']
    });
  };

  private createJobPosition(dto: Partial<JobPositionData>): JobPositionData {
    return {
      id: dto.id ?? crypto.randomUUID(),
      
      sector_name: dto.sector_name!,
      sector_activity_code: dto.sector_activity_code ?? '',
      sector_activity_additional_description: dto.sector_activity_additional_description ?? '',

      job_position: dto.job_position!,
      job_activity_code: dto.job_activity_code ?? '',
      job_activity_additional_description: dto.job_activity_additional_description ?? '',
    };
  }

  public resetJobPositionForm(): void {
    this.workStructureStore.clearJobPositionSelected();
    this.jobPositionForm.patchValue({
      sector_name : '',
      sector_activity_code : '',
      sector_activity_description : '',
      job_position : '',
      job_activity_code : '',
      job_activity_description: '',
    });
    this.jobPositionForm.markAsPristine();
    this.jobPositionForm.markAsUntouched();
  }

  public addJobPosition(): void {
    this.jobPositionForm.markAllAsTouched();
    if( this.jobPositionForm.invalid ) return;
    const jobPositionDto = this.createJobPosition( this.jobPositionForm.value );
    if( this.workStructureStore.selectedJobPosition() != null ){
      jobPositionDto.id = this.workStructureStore.selectedJobPosition()?.id;
    }
    if( jobPositionDto ){
      this.workStructureStore.onSaveJobPosition( jobPositionDto );
      this.onSaveForm()
      this.resetJobPositionForm();
    }
  }

  public onSaveForm(): void {
    this.wizardService.saveStep('workStructure', {
      ...this.workStructureForm.value,
      job_positions: this.workStructureStore.jobPositions(),
    });
  }
  
  public onRemoveJobPosition( itemId : string ): void {
    if( this.workStructureStore.selectedJobPosition()?.id === itemId){
      this.workStructureStore.clearJobPositionSelected();
      this.patchValuesJobPositionForm( this.buildJobPositionForm().value );
    }
    this.workStructureStore.onRemoveJobPosition( itemId );
  }
  
  public onNext(): void {
    const mainFieldsValid = [
      'own_administrative_workers_count',
      'own_production_workers_count',
      'temporary_service_administrative_workers_count',
      'temporary_service_production_workers_count',
    ].every(field => this.workStructureForm.get(field)!.valid);

    if (!mainFieldsValid) {
      this.workStructureForm.markAllAsTouched();
      return;
    }
    if (this.workStructureStore.jobPositions().length === 0) {
      return; // regla de negocio: debe haber al menos un sector-puesto declarado
    }
    this.wizardService.saveStep('workStructure', {
      ...this.workStructureForm.value,
    });
    this.router.navigate(['../sustancias-cancerigenas'], { relativeTo: this.route });
  }

  public onSubmit(): void {
    this.onNext();
  }
  
}

