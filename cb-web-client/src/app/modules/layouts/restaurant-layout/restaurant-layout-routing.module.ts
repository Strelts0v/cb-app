import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantLayoutComponent } from './restaurant-layout.component';
import { RestaurantStates } from '../../../constants/restaurant-states.constant';
import { RestaurantControlComponent } from '../../pages/restaurant-control/restaurant-control.component';
import { RestaurantDetailsComponent } from '../../pages/restaurant-details/restaurant-details.component';
import { OrganizationDetailsComponent } from '../../pages/organization-details/organization-details.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RestaurantStates.RESTAURANT_CONTROL
      },
      {
        path: RestaurantStates.RESTAURANT_CONTROL,
        component: RestaurantControlComponent,
      },
      {
        path: RestaurantStates.RESTAURANT_DETAILS,
        component: RestaurantDetailsComponent,
      },
      {
        path: RestaurantStates.ORGANIZATION_DETAILS,
        component: OrganizationDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantLayoutRoutingModule { }
