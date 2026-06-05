import { Component, Input } from '@angular/core';
import { FilterOption } from '../../../utils/filters/filter.interface';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Input({ required : true }) options : FilterOption[] = [];
  @Input({ required : true }) placeholder : string = 'Seleccionar';



}
