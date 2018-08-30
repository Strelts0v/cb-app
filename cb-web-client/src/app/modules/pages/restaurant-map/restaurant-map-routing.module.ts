import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMapComponent } from './restaurant-map.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantMapRoutingModule { }
