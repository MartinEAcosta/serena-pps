import { Routes } from '@angular/router';

import { HomeComponent, ResourcesComponent } from '@shared/pages';
import { CarcinogenicAgentsLayoutComponent } from './carcinogenic-agents/layout/carcinogenic-agents-layout/carcinogenic-agents-layout.component';
import { FormEstablishmentComponent } from './carcinogenic-agents/components/form-establishment/form-establishment.component';
import { FormWorkStructureComponent } from './carcinogenic-agents/components/form-work-structure/form-work-structure.component';
import { FormCarcinogenicAgentsComponent } from './carcinogenic-agents/components/form-carcinogenic-agents/form-carcinogenic-agents.component';

export const routes: Routes = [

  { 
    path: '' , 
    component: HomeComponent,
  },
  {
    path: 'recursos',
    component: ResourcesComponent,
  },
  {
    path: 'resolucion-cancerigenos',
    component: CarcinogenicAgentsLayoutComponent,
    children : [
      {
        path: 'establecimiento',
        component : FormEstablishmentComponent
      },
      {
        path: 'sectores-puestos',
        component: FormWorkStructureComponent
      },
      {
        path: 'sustancias-cancerigenas',
        component: FormCarcinogenicAgentsComponent
      },
      {
        path: '**',
        redirectTo : 'establecimiento'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }

];