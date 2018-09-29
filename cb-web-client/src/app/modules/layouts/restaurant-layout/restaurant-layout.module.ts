import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantLayoutRoutingModule } from './restaurant-layout-routing.module';
import { RestaurantLayoutComponent } from './restaurant-layout.component';
import { RestaurantSettingsModule } from '../../pages/restaurant-settings/restaurant-settings.module';

@NgModule({
  imports: [
    CommonModule,
    RestaurantLayoutRoutingModule,
    RestaurantSettingsModule
  ],
  declarations: [
    RestaurantLayoutComponent
  ]
})
export class RestaurantLayoutModule { }
