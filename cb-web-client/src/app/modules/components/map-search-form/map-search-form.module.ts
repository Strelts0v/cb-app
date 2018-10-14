import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSearchFormComponent } from './map-search-form.component';
import { MaterialModule } from '../../shared/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [MapSearchFormComponent],
  exports: [MapSearchFormComponent]
})
export class MapSearchFormModule { }
