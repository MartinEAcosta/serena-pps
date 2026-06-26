import { Component, Input } from '@angular/core';
import { EmployerFieldsComponent } from "../employer-fields/employer-fields.component";
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { FormGroup } from '@angular/forms';
import { SelectOption } from '../../../forms/models/form.interfaces';
import { FormSelectFieldComponent } from "@shared/form-select-field/form-select-field.component";

@Component({
  selector: 'app-responsible-fields',
  imports: [EmployerFieldsComponent, FormFieldComponent, FormSelectFieldComponent],
  templateUrl: './responsible-fields.component.html',
  styleUrl: './responsible-fields.component.scss'
})
export class ResponsibleFieldsComponent {

  @Input({ required: true }) subtitle! : string;
  @Input({ required: true }) form! : FormGroup;
  @Input({ required: true }) jobTitleOptions! : SelectOption[];
  @Input({ required: true }) employmentTypeOptions! : SelectOption[];
  @Input({ required : true }) prefix_fields! : string;

  
}
