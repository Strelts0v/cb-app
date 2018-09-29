import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantLayoutComponent } from './restaurant-layout.component';
import { RestaurantStates } from '../../../constants/restaurant-states.constant';
import { RestaurantSettingsComponent } from '../../pages/restaurant-settings/restaurant-settings.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RestaurantStates.RESTAURANT_SETTINGS
      },
      {
        path: RestaurantStates.RESTAURANT_SETTINGS,
        component: RestaurantSettingsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantLayoutRoutingModule { }
