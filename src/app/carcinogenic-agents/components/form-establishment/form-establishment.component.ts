import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../../../forms/utils/form-utils';
import { LabelInfoComponent } from "@shared/components/label-info/label-info.component";
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";
import { BtnBasicComponent } from "@shared/components/btn-basic/btn-basic.component";
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { SelectOption } from '../../../forms/models/form.interfaces';
import { EmployerFieldsComponent } from '../employer-fields/employer-fields.component';
import { ResponsibleFieldsComponent } from '../responsible-fields/responsible-fields.component';
import { FormSectionComponent } from "../../../forms/components/form-section/form-section.component";
import { FilterOption } from '../../../utils/filters/filter.interface';

const jobTitleOptions : SelectOption[]= [
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
  imports: [ReactiveFormsModule, LabelInfoComponent, LabelErrorComponent, NgClass, BtnBasicComponent, FormFieldComponent, EmployerFieldsComponent, ResponsibleFieldsComponent, FormSectionComponent],
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
    same_as_contact_person : [ false ],
    /* Middle Form */ 
    id_establishment : [ '' , [ Validators.required ] ],
    declaration_year : [ '' , [ Validators.required ] ],
    presentation_type : [ '' , [ Validators.required ] ],
    name_employer_responsible : [ '' , [ Validators.minLength(2) ] ],
    last_name_employer_responsible : [ '' , [ Validators.minLength(2) ] ], 
    cuit_employer_responsible : [ '' , [ Validators.maxLength(11), Validators.pattern(FormUtils.cuitPattern) ] ],
    contact_phone_establishment : [ '' , [ Validators.required, Validators.pattern(FormUtils.phonePattern) ] ],
    contact_email_establishment : [ '' , [ Validators.required, Validators.pattern(FormUtils.emailPattern) ] ],
    /* Bottom Form */
    cuit_security_responsible : [ '' , [ Validators.required, Validators.maxLength(11), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_security_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_security_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    representation_type_security_responsible : [ '' , [ Validators.required ] ],
    employment_type_security_responsible : [ '' , [ Validators.required ] ],
    professional_license_security_responsible : [ '' , [ Validators.required ] ],
    hourse_worked_security_responsible : [ '' , [ Validators.required , Validators.min(1) , Validators.max(744) ] ],

    cuit_occupational_medicine_responsible : [ '' , [ Validators.required, Validators.maxLength(11), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_occupational_medicine_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_occupational_medicine_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    representation_type_occupational_medicine_responsible : [ '' , [ Validators.required ] ],
    employment_type_occupational_medicine_responsible : [ '' , [ Validators.required ] ],
    professional_license_occupational_medicine_responsible : [ '' , [ Validators.required ] ],
    hourse_worked_occupational_medicine_responsible : [ '' , [ Validators.required , Validators.min(1) , Validators.max(744) ] ],

    cuit_data_responsible : [ '' , [ Validators.required, Validators.maxLength(11), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_data_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_data_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    representation_type_data_responsible : [ '' , [ Validators.required ] ],
    employment_type_data_responsible : [ '' , [ Validators.required ] ],
    professional_license_data_responsible : [ '' , [ Validators.required ] ],
    hourse_worked_data_responsible : [ '' , [ Validators.required , Validators.min(1) , Validators.max(744) ] ],
  }); 

  // En caso que se le de un establecimiento se renderiza como modificación
  isEditMode : boolean = false;
  get presentation_type() {
    return this.isEditMode ? 'Modificación de presentación' : 'Presentación Anual' 
  }

  public getJobTitleOptions() : FilterOption[]{
    return jobTitleOptions;
  };

  public getEmploymentTypeOptions() : FilterOption[] {
    return employmentTypeOptions;
  }

  public onSubmit(){
    this.establishmentForm.markAllAsTouched();
    console.log(this.establishmentForm.value);
    // Quitar - a cuit del empleado
  }

}
