import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantLayoutRoutingModule } from './restaurant-layout-routing.module';

import { RestaurantLayoutComponent } from './restaurant-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RestaurantLayoutRoutingModule
  ],
  declarations: [
    RestaurantLayoutComponent
  ]
})
export class RestaurantLayoutModule { }
