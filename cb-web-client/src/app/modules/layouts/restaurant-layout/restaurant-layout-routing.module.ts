import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantLayoutComponent } from './restaurant-layout.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantLayoutRoutingModule { }
