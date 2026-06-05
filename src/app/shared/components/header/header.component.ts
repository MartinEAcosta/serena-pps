import { Component } from '@angular/core';
import { StickyHeaderMenuComponent } from "../sticky-header-menu/sticky-header-menu.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [StickyHeaderMenuComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  
}
