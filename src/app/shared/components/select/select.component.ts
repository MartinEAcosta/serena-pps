import { Component, EventEmitter, input, Output, } from '@angular/core';
import { FilterOption } from '../../../utils/filters/filter.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  
  options = input.required<FilterOption[]>();
  placeholder = input('Seleccionar');
  selected = input<FilterOption | null>();
  @Output() selectedChange = new EventEmitter<FilterOption>();

  public onClick( item : FilterOption ) : void {
    this.selectedChange.emit( item );
  }

}
