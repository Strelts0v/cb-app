import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantLayoutRoutingModule } from './restaurant-layout-routing.module';
import { RestaurantLayoutComponent } from './restaurant-layout.component';
import { RestaurantControlModule } from '../../pages/restaurant-control/restaurant-control.module';
import { MaterialModule } from '../../shared/material/material.module';
import { FooterModule } from '../../components/footer/footer.module';
import { RestaurantDetailsModule } from '../../pages/restaurant-details/restaurant-details.module';
import { OrganizationDetailsModule } from '../../pages/organization-details/organization-details.module';

@NgModule({
  imports: [
    CommonModule,
    RestaurantLayoutRoutingModule,
    MaterialModule,
    FooterModule,
    RouterModule,
    RestaurantControlModule,
    RestaurantDetailsModule,
    OrganizationDetailsModule
  ],
  declarations: [
    RestaurantLayoutComponent
  ]
})
export class RestaurantLayoutModule { }
