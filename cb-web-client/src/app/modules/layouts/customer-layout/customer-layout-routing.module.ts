import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout.component';
import { CustomerStates } from '../../../constants/customer-states.constant';
import { RestaurantMapComponent } from '../../pages/restaurant-map/restaurant-map.component';

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
        component: RestaurantMapComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLayoutRoutingModule { }
