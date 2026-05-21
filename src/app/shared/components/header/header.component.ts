import { Component } from '@angular/core';
import { StickyHeaderMenuComponent } from "../sticky-header-menu/sticky-header-menu.component";

@Component({
  selector: 'app-header',
  imports: [StickyHeaderMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
