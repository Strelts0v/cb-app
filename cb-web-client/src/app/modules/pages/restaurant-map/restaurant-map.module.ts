import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { FormsModule } from '@angular/forms';

import { RestaurantMapRoutingModule } from './restaurant-map-routing.module';
import { MaterialModule } from './../../shared/material/material.module';

import { RestaurantMapComponent } from './restaurant-map.component';
import { MapSearchFormComponent } from './map-search-form/map-search-form.component';

import { MapSearchService } from './map-search.service';

@NgModule({
  imports: [
    CommonModule,
    RestaurantMapRoutingModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAfJTVKnpLl0ULuuwDuix-9ANpyQhP6mfc'
    }),
    FormsModule
  ],
  declarations: [
    RestaurantMapComponent,
    MapSearchFormComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    MapSearchService
  ]
})
export class RestaurantMapModule { }
