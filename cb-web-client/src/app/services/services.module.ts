import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MapSearchService } from './map-search.service';
import { RestaurantService } from './restaurant.service';
import { MessageService } from './message.service';
import { InMemoryRestaurantService } from './in-memory/in-memory-restaurants.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MapSearchService,
    RestaurantService,
    MessageService
  ]
})
export class ServicesModule {
}
