import { Component } from '@angular/core';
import { FormHeaderComponent } from "../../components/form-header/form-header.component";
import { NavigationItem } from '@models/shared/navigation-item.model';
import { FormEstablishmentComponent } from "../../../forms/form-establishment/form-establishment.component";

@Component({
  selector: 'app-carcinogenic-agents',
  imports: [FormHeaderComponent, FormEstablishmentComponent],
  templateUrl: './carcinogenic-agents.component.html',
  styleUrl: './carcinogenic-agents.component.html'
})
export class CarcinogenicAgentsComponent {

  protected readonly navigationItems : NavigationItem[] = [
    {
      label: 'Establecimiento',
      href: 'establecimiento',
    },
    {
      label: 'Estructura Empresarial',
      href: 'sectores-puestos'
    },
  ];

}
