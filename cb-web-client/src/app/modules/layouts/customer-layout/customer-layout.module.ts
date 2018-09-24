import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLayoutRoutingModule } from './customer-layout-routing.module';
import { MaterialModule } from './../../shared/material/material.module';
import { FooterModule } from '../../components/footer/footer.module';
import { CustomerLayoutComponent } from './customer-layout.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerLayoutRoutingModule,
    MaterialModule,
    FooterModule
  ],
  declarations: [
    CustomerLayoutComponent
  ]
})
export class CustomerLayoutModule { }
