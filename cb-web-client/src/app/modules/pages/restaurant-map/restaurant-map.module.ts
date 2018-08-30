import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantMapRoutingModule } from './restaurant-map-routing.module';

import { RestaurantMapComponent } from './restaurant-map.component';

@NgModule({
  imports: [
    CommonModule,
    RestaurantMapRoutingModule
  ],
  declarations: [
    RestaurantMapComponent
  ]
})
export class RestaurantMapModule { }
