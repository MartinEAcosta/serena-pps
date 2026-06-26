import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSectionComponent } from "../../../forms/components/form-section/form-section.component";
import { AddButtonComponent } from "@shared/components/add-button/add-button.component";
import { JobPositionComponent } from "../job-position/job-position.component";
import { FormNavigationBtnsComponent } from "@shared/components/form-navigation-btns/form-navigation-btns.component";
import { FormWizardService } from '../../../form-wizard.service';
import { BtnBasicComponent } from "@shared/components/btn-basic/btn-basic.component";
import { ActionableListComponent } from "@shared/components/actionable-list/actionable-list.component";
import { JobPositionData } from '@models/work-structure/work-structure.interfaces';
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";

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

  workStructureForm : FormGroup = this.fb.group({
    own_administrative_workers_count: [ '', [ Validators.min(0)] ],
    own_production_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_administrative_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_production_workers_count: [ '', [ Validators.min(0)] ],
    
    job_position: this.createJobPosition(),
  });

  jobPositions = signal<Map<string,JobPositionData>>(new Map<string,JobPositionData>());
  jobPositionSelected = signal<JobPositionData | null>( null );

  constructor () {}

  private buildKey(sectorName: string, jobPosition: string): string {
    return `${sectorName.trim()}-${jobPosition.trim()}`;
  }

  get jobPositionForm(): FormGroup {
   return this.workStructureForm.get('job_position') as FormGroup;
  }

  ngOnInit(): void {
    const savedData = this.wizardService.getStep('workStructure');
    if (savedData) {
      if (savedData.job_positions && savedData.job_positions.length > 0) {
        const positionsSaved = new Map<string, JobPositionData>();
        savedData.job_positions.forEach(position => {
          const key = this.buildKey(position.sector_name, position.job_position);
          positionsSaved.set(key, position);
        });
        this.jobPositions.set(positionsSaved);
      }

      this.workStructureForm.patchValue({
        own_administrative_workers_count: savedData.own_administrative_workers_count,
        own_production_workers_count: savedData.own_production_workers_count,
        temporary_service_administrative_workers_count: savedData.temporary_service_administrative_workers_count,
        temporary_service_production_workers_count: savedData.temporary_service_production_workers_count,
      });
    }
  }

  public createJobPosition() : FormGroup {
    return this.fb.group({
      sector_name: ['', [Validators.required , Validators.minLength(3)]],
      sector_activity_code: ['', [ Validators.required ]],
      sector_activity_additional_description: ['', ],

      job_position: ['', [ Validators.required, Validators.minLength(3)]],
      job_activity_code: ['', [ Validators.required ]],
      job_activity_additional_description: ['']
    });
  };

  private buildJobPositionDto(dto: Partial<JobPositionData>): JobPositionData {
    return {
      sector_name: dto.sector_name!,
      sector_activity_code: dto.sector_activity_code ?? '',
      sector_activity_additional_description: dto.sector_activity_additional_description ?? '',

      job_position: dto.job_position!,
      job_activity_code: dto.job_activity_code ?? '',
      job_activity_additional_description: dto.job_activity_additional_description ?? '',
    };
  }

  public onRemoveJobPosition(itemKey: string): void {
    const newMap = new Map(this.jobPositions());
    newMap.delete(itemKey);
    this.jobPositions.set(newMap);

    if (this.jobPositionSelected() &&
        this.buildKey(this.jobPositionSelected()!.sector_name, this.jobPositionSelected()!.job_position) === itemKey) {
      this.resetJobPositionForm();
    }
  }

  public onSelectJobPosition( itemId: string): void {
    const itemToSelect = this.jobPositions().get( itemId );
    if( itemToSelect ){
      this.jobPositionSelected.set( itemToSelect);
      this.jobPositionForm.patchValue( itemToSelect );
    }
  }

  public resetJobPositionForm(): void {
    this.jobPositionSelected.set(null);
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

    const jobPositionDto = this.buildJobPositionDto( this.jobPositionForm.value );
    const key = this.buildKey(jobPositionDto.sector_name, jobPositionDto.job_position);

    const newMap = new Map(this.jobPositions());
    newMap.set(key, jobPositionDto);
    this.jobPositions.set(newMap);
    this.resetJobPositionForm();
  }


  public onSaveForm(): void {
    this.wizardService.saveStep('workStructure', {
      ...this.workStructureForm.value,
      job_positions: Array.from(this.jobPositions().values())
    });
  }
  
  public onNext(): void {
    // Validamos solo los campos planos del form principal (no job_position, que es el form de edición)
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

    if (this.jobPositions().size === 0) {
      return; // regla de negocio: debe haber al menos un sector-puesto declarado
    }

    this.wizardService.saveStep('workStructure', {
      ...this.workStructureForm.value,
      job_positions: Array.from(this.jobPositions().values())
    });
    this.router.navigate(['../sustancias-cancerigenas'], { relativeTo: this.route });
  }

  public onSubmit(): void {
    this.onNext();
  }
  
}

