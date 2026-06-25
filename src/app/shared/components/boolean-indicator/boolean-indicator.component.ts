import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-boolean-indicator',
  imports: [ReactiveFormsModule],
  templateUrl: './boolean-indicator.component.html',
  styleUrl: './boolean-indicator.component.scss'
})
export class BooleanIndicatorComponent {

  @Input({ required : true }) prefix! : string;
  @Input({ required : true }) form! : FormGroup;

  select(value: boolean): void {
    this.form.get(this.prefix)?.setValue(value);
    this.form.get(this.prefix)?.markAsDirty();
    this.form.get(this.prefix)?.markAsTouched();
  }
}
