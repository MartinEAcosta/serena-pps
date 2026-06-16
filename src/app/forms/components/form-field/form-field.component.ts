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

  @Input() labelText! : string;
  @Input() info! : string;
  @Input() type! : string;
  @Input() placeholder! : string;
  @Input() prefix! : string;
  @Input() form! : FormGroup;

  get control( ) {
    // console.log('input-'+ this.prefix)
    return this.form.get(this.prefix);
  }
  
}
