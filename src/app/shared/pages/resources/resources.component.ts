import { Component } from '@angular/core';
import { ResourceList } from '@models/resources/resources.model';
import { SectionDropdownComponent } from '@shared/components/section-dropdown/section-dropdown.component';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-resources',
  imports: [SectionDropdownComponent, RouterLink],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent {

  resourcesList: ResourceList[] = [
    {
      titleHeader: 'TRÁMITES Y FORMULARIOS',
      dropdowns: [
        {
          title: 'Prevención',
          items: [
            {
              text: 'Relevamiento General de Riesgos Laborales - Decreto 351/79',
              href: '',
            },
            {
              text: 'Instructivo RAR',
              href: '',
            },
            {
              text: 'Instructivo RGRL',
              href: '',
            },
            {
              text: 'Preguntas frecuentes carga RAR web',
              href: '',
            },
            {
              text: 'Preguntas frecuentes carga RGRL web',
              href: '',
            },
            {
              text: 'Relevamiento de Agentes de Riesgos',
              href: '',
            },
            {
              text: 'Relevamiento General de Riesgos Laborales - Decreto 617/96',
              href: '',
            },
            {
              text: 'Relevamiento General de Riesgos Laborales - Decreto 911/96',
              href: '',
            },
            {
              text: 'Res. SRT N° 80/2019 - Formulario Sistema de Vigilancia y Control de Sustancias y Agentes (S.V.C.C.)',
              href: '',
            },
            {
              text: 'Res. SRT N° 363/16 - Formulario IGE (Información General del Empleador)',
              href: '',
            },
            {
              text: 'Res. SRT N° 299/11 - Constancia de entrega de Ropa de Trabajo y elementos de Protección Personal',
              href: '',
            },
            {
              text: 'Aviso de obra',
              href: '',
            },
            {
              text: 'Listado de establecimientos',
              href: '',
            }
          ],
        },
        {
          title: 'Siniestros',
          items: [
            {
              text: 'Formulario Acreditación en cuenta',
              href: '',
            }
          ]
        }
      ],
    },
    
  ];

}
