import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface ActionableListItem {
  id: string;
  label: string;
}
@Component({
  selector: 'app-actionable-list',
  imports: [],
  templateUrl: './actionable-list.component.html',
  styleUrl: './actionable-list.component.scss'
})
export class ActionableListComponent<T extends ActionableListItem> {

  @Input({ required : true }) arraySignal : T[] = [];
  @Input({ required : true }) selectedItem : T | null = null;
  @Input({ required : true }) placeholder! : string;
  @Output() visualizeItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();

  constructor(){
    console.log(this.arraySignal)
  }
}
