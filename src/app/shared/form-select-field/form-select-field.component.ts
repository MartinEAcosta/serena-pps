import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelInfoComponent } from "@shared/components/label-info/label-info.component";
import { SelectComponent } from "@shared/components/select/select.component";
import { LabelErrorComponent } from "@shared/components/label-error/label-error.component";
import { FilterOption } from '../../utils/filters/filter.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select-field',
  imports: [LabelInfoComponent, SelectComponent, LabelErrorComponent],
  templateUrl: './form-select-field.component.html',
  styleUrl: './form-select-field.component.scss'
})
export class FormSelectFieldComponent {

  @Input({ required : true }) labelText! : string; 
  @Input({ required : true }) info! : string; 
  @Input({ required : true }) options! : FilterOption[];
  @Input({ required : true }) prefix! : string;
  @Input({ required : true }) placeholder! : string;
  @Input({ required : true }) form! : FormGroup;
  @Input() disabledHint: string = 'Campo no disponible';

  get selectedOption(): FilterOption | null {
    const value = this.form.get(this.prefix)?.value;
    return this.options.find(o => o.value === value) ?? null;
  }

  get isDisabled(): boolean {
    return this.form.get(this.prefix)?.disabled ?? false;
  }

  public onSelectedChange ( option : FilterOption ) {
    if (this.isDisabled) return;
    this.form.get(this.prefix)?.setValue(option.value);
  }
}
