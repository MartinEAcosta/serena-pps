import { Routes } from '@angular/router';

import { HomeComponent, ResourcesComponent } from '@shared/pages';
import { CarcinogenicAgentsLayoutComponent } from './resolucion81-2019/pages/layout/carcinogenic-agents-layout/carcinogenic-agents-layout.component';
import { FormEstablishmentComponent } from './resolucion81-2019/pages/form-establishment/form-establishment.component';
import { FormWorkStructureComponent } from './resolucion81-2019/pages/form-work-structure/form-work-structure.component';
import { FormCarcinogenicAgentsComponent } from './resolucion81-2019/pages/form-carcinogenic-agents/form-carcinogenic-agents.component';

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