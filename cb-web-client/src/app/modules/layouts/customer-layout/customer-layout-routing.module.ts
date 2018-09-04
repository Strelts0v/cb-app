import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './../../shared/material/material.module';

import { CustomerLayoutComponent } from './customer-layout.component';
import { CustomerStates } from '../../../constants/customer-states.constant';


const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: CustomerStates.RESTAURANT_MAP
      },
      {
        path: CustomerStates.RESTAURANT_MAP,
        loadChildren: '../../pages/restaurant-map/restaurant-map.module#RestaurantMapModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLayoutRoutingModule { }
