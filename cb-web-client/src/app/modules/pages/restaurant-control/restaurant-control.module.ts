import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantControlComponent } from './restaurant-control.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ServicesModule } from '../../../services/services.module';
import { NotificationDialogModule } from '../../components/notification-dialog/notification-dialog.module';
import { NotificationDialogComponent } from '../../components/notification-dialog/notification-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule,
    MaterialModule,
    RouterModule,
    NotificationDialogModule
  ],
  declarations: [RestaurantControlComponent],
  providers: [ServicesModule],
  entryComponents: [
    RestaurantControlComponent,
    NotificationDialogComponent
  ],
  bootstrap: [RestaurantControlComponent]
})
export class RestaurantControlModule { }
