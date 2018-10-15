import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationDialogComponent } from './notification-dialog.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [NotificationDialogComponent]
})
export class NotificationDialogModule { }
