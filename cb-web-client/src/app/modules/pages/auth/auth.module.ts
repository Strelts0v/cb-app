import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ServicesModule } from '../../../services/services.module';
import { MaterialModule } from '../../shared/material/material.module';
import { RouterModule } from '@angular/router';

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
