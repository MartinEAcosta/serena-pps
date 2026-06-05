import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-info',
  imports: [],
  templateUrl: './label-info.component.html',
  styleUrl: './label-info.component.scss'
})
export class LabelInfoComponent {

  @Input({ required : true }) labelText : string = '';
  @Input({ required : true }) info : string = '';

}
