import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantDetailsComponent } from './restaurant-details.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { MapSearchFormComponent } from '../../components/map-search-form/map-search-form.component';
import { ServicesModule } from '../../../services/services.module';
import { RestaurantDetailsFormComponent } from './restaurant-details-form/restaurant-details-form.component';
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
    RestaurantDetailsComponent,
    RestaurantDetailsFormComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    ServicesModule
  ],
  entryComponents: [
    RestaurantDetailsComponent,
    RestaurantDetailsFormComponent
  ],
  bootstrap: [RestaurantDetailsComponent]
})
export class RestaurantDetailsModule { }
