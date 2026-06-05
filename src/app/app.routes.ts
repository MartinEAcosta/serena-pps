import { Routes } from '@angular/router';
import { CarcinogenicAgentsComponent } from '@shared/pages/carcinogenic-agents/carcinogenic-agents.component';

import { HomeComponent, ResourcesComponent } from '@shared/pages';

export const routes: Routes = [

  { 
    path : '' , 
    component: HomeComponent,
  },
  {
    path : 'recursos',
    component: ResourcesComponent,
  },
  {
    path : 'resolucion-cancerigenos',
    component: CarcinogenicAgentsComponent,
  }

];