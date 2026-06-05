import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../utils/form-utils';
import { LabelInfoComponent } from "@shared/components/label-info/label-info.component";
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";
import { SelectComponent } from "@shared/components/select/select.component";

const jobTitleOptions = [
  { label : 'Representante Legal', value: '' },
  { label : 'Presidente', value: '' },
  { label : 'Director General', value: '' },
  { label : 'Administrador General', value: '' },
  { label : 'Vicepresidente', value: '' },
  { label : 'Gerente General', value: '' },
  { label : 'Otros', value: '' },
];

const employmentTypeOptions = [
  { label : 'Propio', value : '' },
  { label : 'Contratado', value : '' },
];

@Component({
  selector: 'app-form-establishment',
  imports: [ReactiveFormsModule, LabelInfoComponent, LabelErrorComponent, NgClass, SelectComponent],
  templateUrl: './form-establishment.component.html',
  styleUrl: './form-establishment.component.scss'
})
export class FormEstablishmentComponent {
  
  private fb = inject(FormBuilder);

  establishmentForm : FormGroup = this.fb.group({
    /* Top Form */
    name_employer : [ '' , [ Validators.required , Validators.minLength(2) ] ],
    last_name_employer : [ '' , [ Validators.required , Validators.minLength(2) ] ], 
    cuit_employer : [ '' , [ Validators.required , Validators.maxLength(11), Validators.pattern(FormUtils.cuitPattern) ] ],
    /* Middle Form */ 
    id_establishment : [ '' , [ Validators.required ] ],
    declaration_year : [ '' , [ Validators.required ] ],
    presentation_type : [ '' , [ Validators.required ] ],
    same_as_contact_person : [ false ],
    contact_phone_establishment : [ '' , [ Validators.required, Validators.pattern(FormUtils.phonePattern) ] ],
    contact_email_establishment : [ '' , [ Validators.required, Validators.pattern(FormUtils.emailPattern) ] ],
    /* Bottom Form */
    cuit_security_responsible : [ '' , [ Validators.required, Validators.maxLength(11), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_security_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_security_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    // responsible_type_security_responsible : [ '' , [ Validators.required ] ],
    representation_type_security_responsible : [ '' , [ Validators.required ] ],
    employment_type_security_responsible : [ '' , [ Validators.required ] ],
    professional_license_security_responsible : [ '' , [ Validators.required ] ],
    hourse_worked_security_responsible : [ '' , [ Validators.required ] ],
  }); 

  public getJobTitleOptions(){
    return jobTitleOptions;
  };

  public getEmploymentTypeOptions() {
    return employmentTypeOptions;
  }

  public onSubmit(){
    console.log(this.establishmentForm.value);
    // Quitar - a cuit del empleado
  }

}
