import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLayoutRoutingModule } from './customer-layout-routing.module';

import { CustomerLayoutComponent } from './customer-layout.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerLayoutRoutingModule
  ],
  declarations: [
    CustomerLayoutComponent
  ]
})
export class CustomerLayoutModule { }
