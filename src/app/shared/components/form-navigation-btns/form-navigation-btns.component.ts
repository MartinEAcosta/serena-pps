import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BtnBasicComponent } from "../btn-basic/btn-basic.component";

@Component({
  selector: 'app-form-navigation-btns',
  imports: [BtnBasicComponent],
  templateUrl: './form-navigation-btns.component.html',
  styleUrl: './form-navigation-btns.component.scss'
})
export class FormNavigationBtnsComponent {

  @Input() nextLabel: string = 'Siguiente';
  @Input() nextDisabled: boolean = false;
  @Output() save = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
