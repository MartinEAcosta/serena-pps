import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { FormUtils } from '../../../forms/utils/form-utils';

@Component({
  selector: 'app-label-error',
  templateUrl: './label-error.component.html',
  styleUrl: './label-error.component.scss'
})
export class LabelErrorComponent {

  @Input({required: true}) control! : AbstractControl;

  get errorMessage () {
    // En caso de que se encuentren errores los almacena, sino es un objeto vacio
    const errors : ValidationErrors = this.control.errors || {};

    // Si el formulario fue tocado y contiene errores retorna el texto, sino null.
    return this.control.touched && Object.keys(errors).length > 0
                ? FormUtils.getTextError(errors)
                : null
    ;
  
  }


}
