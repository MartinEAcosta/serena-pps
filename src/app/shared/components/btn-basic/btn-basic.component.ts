import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger';

@Component({
  selector: 'app-btn-basic',
  imports: [NgClass],
  templateUrl: './btn-basic.component.html',
  styleUrls: ['./btn-basic.component.scss']
})
export class BtnBasicComponent {

  @Input({ required : true }) label! : string;
  @Input({ required : true }) variant! : ButtonVariant;
  @Input({ required : true }) type! : string;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
