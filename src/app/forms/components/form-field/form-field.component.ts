import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

import { LabelInfoComponent } from "@shared/components/label-info/label-info.component";
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, LabelInfoComponent, LabelErrorComponent, NgClass],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {

  @Input({ required : true }) labelText! : string;
  @Input({ required : true }) info! : string;
  @Input({ required : true }) placeholder! : string;
  @Input({ required : true }) prefix! : string;
  @Input({ required : true }) form! : FormGroup;
  @Input() type! : string;

  get control( ) {
    // console.log('input-'+ this.prefix)
    return this.form.get(this.prefix);
  }
  
}
