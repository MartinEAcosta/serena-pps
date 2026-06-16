import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";

@Component({
  selector: 'app-form-work-structure',
  imports: [ReactiveFormsModule, FormFieldComponent],
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

    sector: ['' , [ Validators.minLength(5)] ], 
  });

  public onSubmit(){
    this.workStructureForm.markAllAsTouched();
    console.log(this.workStructureForm.value);
  }
}
