import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormHeaderComponent } from "@shared/components/form-header/form-header.component";
import { NavigationItem } from '@models/shared/navigation-item.model';

@Component({
  selector: 'app-carcinogenic-agents-layout',
  imports: [RouterOutlet, FormHeaderComponent],
  templateUrl: './carcinogenic-agents-layout.component.html',
  styleUrl: './carcinogenic-agents-layout.component.scss'
})
export class CarcinogenicAgentsLayoutComponent {
  protected readonly navigationItems : NavigationItem[] = [
    {
      label: 'Establecimiento',
      href: 'establecimiento',
    },
    {
      label: 'Estructura Empresarial',
      href: 'sectores-puestos'
    },
    {
      label: 'Sustancias Cancerigenos',
      href: 'sustancias-cancerigenas'
    }
  ];
}
