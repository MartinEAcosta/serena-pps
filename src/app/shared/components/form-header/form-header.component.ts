import { Component, Input } from '@angular/core';

import { NavigationItem } from '@models/shared/navigation-item.model';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrl: './form-header.component.scss'
})
export class FormHeaderComponent {

  @Input() titleForm! : string;
  @Input() navigationItems! : NavigationItem[];


}
