import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldComponent } from '../../../forms/components/form-field/form-field.component';
import { ExtraInfo } from '../../../forms/models/form.interfaces';

const extraInfo : Record<string, ExtraInfo> = {
  employer : {
    label: 'del empleador',
    info: 'del empleador a cargo de la declaración jurada'
  },
  employer_responsible : {
    label: 'del contacto',
    info: 'de la persona a contactar en el establecimiento'
  },
  security_responsible : {
    label: 'del responsable',
    info: 'del responsable de seguridad laboral e higiene'  
  },
  occupational_medicine_responsible : {
    label: 'del responsable',
    info: 'del responsable de sector de medicina laboral'  
  },
  data_responsible : {
    label: 'del responsable',
    info: 'del responsable de datos'  
  }
};


@Component({
  selector: 'app-employer-fields',
  imports: [FormFieldComponent],
  templateUrl: './employer-fields.component.html',
  styleUrl: './employer-fields.component.scss'
})
export class EmployerFieldsComponent {

  @Input() form! : FormGroup;
  @Input({ required : true }) prefix_fields! : string;

  get extraInfo() {
    return extraInfo[this.prefix_fields].info;

  }
    
  get extraLabel() {
    return extraInfo[this.prefix_fields].label;
  }
  
}
