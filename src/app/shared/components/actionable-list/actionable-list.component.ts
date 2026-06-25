import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actionable-list',
  imports: [KeyValuePipe],
  templateUrl: './actionable-list.component.html',
  styleUrl: './actionable-list.component.scss'
})
export class ActionableListComponent<T> {

  @Input({ required : true }) mapSignal! : Map<string, T>;
  @Input({ required : true }) selectedItem! : T;
  @Input({ required : true }) placeholder! : string;
  @Output() visualizeItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();

}
