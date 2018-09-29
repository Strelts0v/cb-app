import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule
  ],
  providers: [
    AuthGuard
  ]
})
export class GuardsModule { }
