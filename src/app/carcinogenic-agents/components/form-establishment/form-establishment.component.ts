import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormUtils } from '../../../forms/utils/form-utils';
import { LabelInfoComponent } from "@shared/components/label-info/label-info.component";
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { SelectOption } from '../../../forms/models/form.interfaces';
import { EmployerFieldsComponent } from '../employer-fields/employer-fields.component';
import { ResponsibleFieldsComponent } from '../responsible-fields/responsible-fields.component';
import { FormSectionComponent } from "../../../forms/components/form-section/form-section.component";
import { FilterOption } from '../../../utils/filters/filter.interface';
import { FormWizardService } from '../../../form-wizard.service';
import { FormNavigationBtnsComponent } from "@shared/components/form-navigation-btns/form-navigation-btns.component";

const jobTitleOptions : SelectOption[]= [
{ label: 'Representante Legal', value: 'legal_representative' },
  { label: 'Presidente', value: 'president' },
  { label: 'Director General', value: 'general_director' },
  { label: 'Administrador General', value: 'general_administrator' },
  { label: 'Vicepresidente', value: 'vice_president' },
  { label: 'Gerente General', value: 'general_manager' },
  { label: 'Otros', value: 'other' },
];

const employmentTypeOptions = [
{ label: 'Propio', value: 'internal' },
  { label: 'Contratado', value: 'outsourced' },
];

@Component({
  selector: 'app-form-establishment',
  imports: [ReactiveFormsModule, LabelInfoComponent, LabelErrorComponent, NgClass, FormFieldComponent, EmployerFieldsComponent, ResponsibleFieldsComponent, FormSectionComponent, FormNavigationBtnsComponent],
  templateUrl: './form-establishment.component.html',
  styleUrl: './form-establishment.component.scss'
})
export class FormEstablishmentComponent implements OnInit{
  
  private fb = inject(FormBuilder);
  private formWizardService = inject(FormWizardService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // En caso que se le de un establecimiento se renderiza como modificación
  isEditMode : boolean = false;
  
  establishmentForm : FormGroup = this.fb.group({
    /* Top Form */
    name_employer : [ '' , [ Validators.required , Validators.minLength(2) ] ],
    last_name_employer : [ '' , [ Validators.required , Validators.minLength(2) ] ], 
    cuit_employer : [ '' , [ Validators.required , Validators.minLength(11) ,Validators.maxLength(13), Validators.pattern(FormUtils.cuitPattern) ] ],
    same_as_contact_person : [ false ],
    /* Middle Form */ 
    id_establishment : [ '' , [ Validators.required ] ],
    declaration_year : [ '' , [ Validators.required ] ],
    presentation_type : [ '' , [ ] ],
    name_employer_responsible : [ '' , [ Validators.minLength(2) ] ],
    last_name_employer_responsible : [ '' , [ Validators.minLength(2) ] ], 
    cuit_employer_responsible : [ '' , [ Validators.minLength(11) ,Validators.maxLength(13), Validators.pattern(FormUtils.cuitPattern) ] ],
    contact_phone_establishment : [ '' , [ Validators.required, Validators.pattern(FormUtils.phonePattern) ] ],
    contact_email_establishment : [ '' , [ Validators.required, Validators.pattern(FormUtils.emailPattern) ] ],
    /* Bottom Form */
    cuit_security_responsible : [ '' , [ Validators.required, Validators.minLength(11) ,Validators.maxLength(13), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_security_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_security_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    representation_type_security_responsible : [ '' , [ Validators.required ] ],
    employment_type_security_responsible : [ '' , [ Validators.required ] ],
    professional_license_security_responsible : [ '' , [ Validators.required ] ],
    hourse_worked_security_responsible : [ '' , [ Validators.required , Validators.min(1) , Validators.max(744) ] ],

    cuit_occupational_medicine_responsible : [ '' , [ Validators.required, Validators.minLength(11) ,Validators.maxLength(13), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_occupational_medicine_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_occupational_medicine_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    representation_type_occupational_medicine_responsible : [ '' , [ Validators.required ] ],
    employment_type_occupational_medicine_responsible : [ '' , [ Validators.required ] ],
    professional_license_occupational_medicine_responsible : [ '' , [ Validators.required ] ],
    hourse_worked_occupational_medicine_responsible : [ '' , [ Validators.required , Validators.min(1) , Validators.max(744) ] ],
  
    cuit_data_responsible : [ '' , [ Validators.required, Validators.minLength(11), Validators.maxLength(13), Validators.pattern(FormUtils.cuitPattern) ] ],
    name_data_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    last_name_data_responsible : [ '' , [ Validators.required, Validators.minLength(2) ] ],
    representation_type_data_responsible : [ '' , [ Validators.required ] ],
    employment_type_data_responsible : [ '' , [ Validators.required ] ],
  }); 

  ngOnInit(): void {
    const savedData = this.formWizardService.getStep('establishment');
    if( savedData ){
      this.establishmentForm.patchValue( savedData );
    }
  }

  get presentation_type() {
    return this.isEditMode ? 'Modificación de presentación' : 'Presentación Anual' 
  }

  public getJobTitleOptions() : FilterOption[]{
    return jobTitleOptions;
  };

  public getEmploymentTypeOptions() : FilterOption[] {
    return employmentTypeOptions;
  }

  public onSaveForm(): void {
    this.formWizardService.saveStep('establishment', this.establishmentForm.value);
  }

  public onNext(): void {
    this.establishmentForm.markAllAsTouched();
    if (this.establishmentForm.invalid) {
      return;
    }

    this.formWizardService.saveStep('establishment', this.establishmentForm.value);
    this.router.navigate(['../sectores-puestos'], { relativeTo: this.route });
  }

  public onSubmit(): void {
    this.onNext();
  }

}
