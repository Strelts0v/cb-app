import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppStates } from './constants/app-states.constant';

const routes: Routes = [
  {
    path: AppStates.CUSTOMER_LAYOUT,
    loadChildren: './modules/layouts/customer-layout/customer-layout.module#CustomerLayoutModule'
  },
  {
    path: AppStates.RESTAURANT_LAYOUT,
    loadChildren: './modules/layouts/restaurant-layout/restaurant-layout.module#RestaurantLayoutModule'
  },
  {
    path: '',
    redirectTo: AppStates.CUSTOMER_LAYOUT,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
