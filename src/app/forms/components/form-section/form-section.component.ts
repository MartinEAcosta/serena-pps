import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-section',
  imports: [NgClass],
  templateUrl: './form-section.component.html',
  styleUrl: './form-section.component.scss'
})
export class FormSectionComponent {

  @Input({ required : true }) title! : string;
  
  protected isOpen = signal<boolean>(true);

  constructor(){}

  toggleOpen () : void {
    this.isOpen.set(!this.isOpen());
  }
}
