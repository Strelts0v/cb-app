import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationDetailsComponent } from './organization-details.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ServicesModule } from '../../../services/services.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ServicesModule,
    FormsModule
  ],
  declarations: [OrganizationDetailsComponent],
  providers: [ServicesModule]
})
export class OrganizationDetailsModule { }
