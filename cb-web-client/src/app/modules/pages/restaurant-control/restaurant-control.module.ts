import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantControlComponent } from './restaurant-control.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ServicesModule } from '../../../services/services.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [RestaurantControlComponent],
  providers: [ServicesModule],
  entryComponents: [RestaurantControlComponent],
  bootstrap: [RestaurantControlComponent]
})
export class RestaurantControlModule { }
