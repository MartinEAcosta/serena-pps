import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavigationItem } from '@models/shared/navigation-item.model';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrl: './form-header.component.scss',
  imports: [RouterLink, RouterLinkActive]
})
export class FormHeaderComponent {

  @Input() titleForm! : string;
  @Input() navigationItems! : NavigationItem[];

  
}
