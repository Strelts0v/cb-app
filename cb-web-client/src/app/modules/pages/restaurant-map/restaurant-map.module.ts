import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material.module';
import { RestaurantMapComponent } from './restaurant-map.component';
import { ServicesModule } from './../../../services/services.module';
import { MapSearchFormModule } from '../../components/map-search-form/map-search-form.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfJTVKnpLl0ULuuwDuix-9ANpyQhP6mfc'
    }),
    FormsModule,
    MapSearchFormModule
  ],
  declarations: [
    RestaurantMapComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    ServicesModule
  ],
  entryComponents: [
    RestaurantMapComponent
  ],
  bootstrap: [RestaurantMapComponent]
})
export class RestaurantMapModule { }
