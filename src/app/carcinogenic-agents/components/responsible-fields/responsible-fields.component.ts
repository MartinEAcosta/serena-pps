import { Component, Input } from '@angular/core';
import { EmployerFieldsComponent } from "../employer-fields/employer-fields.component";
import { FormFieldComponent } from "../../../forms/components/form-field/form-field.component";
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";
import { SelectComponent } from "@shared/components/select/select.component";
import { LabelInfoComponent } from "@shared/components/label-info/label-info.component";
import { FormGroup } from '@angular/forms';
import { SelectOption } from '../../../forms/models/form.interfaces';

@Component({
  selector: 'app-responsible-fields',
  imports: [EmployerFieldsComponent, FormFieldComponent, LabelErrorComponent, SelectComponent, LabelInfoComponent],
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
