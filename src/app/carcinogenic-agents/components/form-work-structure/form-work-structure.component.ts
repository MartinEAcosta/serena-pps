import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSectionComponent } from "../../../forms/components/form-section/form-section.component";
import { AddButtonComponent } from "@shared/components/add-button/add-button.component";
import { JobPositionComponent } from "../job-position/job-position.component";

@Component({
  selector: 'app-form-work-structure',
  imports: [ReactiveFormsModule,FormSectionComponent, AddButtonComponent, JobPositionComponent],
  templateUrl: './form-work-structure.component.html',
  styleUrl: './form-work-structure.component.scss'
})
export class FormWorkStructureComponent {
  private fb = inject(FormBuilder);

  workStructureForm : FormGroup = this.fb.group({
    own_administrative_workers_count: [ '', [ Validators.min(0)] ],
    own_production_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_administrative_workers_count: [ '', [ Validators.min(0)] ],
    temporary_service_production_workers_count: [ '', [ Validators.min(0)] ],
    
    job_positions: this.fb.array([this.createJobPosition()]),

  });

  get jobPositions(): FormArray<FormGroup> {
    return this.workStructureForm.get('job_positions') as FormArray<FormGroup>;
  }

  public createJobPosition() : FormGroup {
    return this.fb.group({
      sector_name: ['', [Validators.minLength(3)]],
      sector_activity_code: [''],
      sector_activity_additional_description: [''],

      job_position: ['', [Validators.minLength(3)]],
      job_activity_code: [''],
      job_activity_additional_description: ['']
    });
  }

  public addJobPosition(): void {
   this.jobPositions.push(this.createJobPosition());
  }

  public onSubmit() : void {
    this.workStructureForm.markAllAsTouched();
    console.log(this.workStructureForm.value);
  }

}

