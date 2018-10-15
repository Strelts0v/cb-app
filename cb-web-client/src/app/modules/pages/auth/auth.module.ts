import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ServicesModule } from '../../../services/services.module';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    ServicesModule
  ],
  entryComponents: [
    AuthComponent
  ],
  bootstrap: [AuthComponent]
})
export class AuthModule { }
