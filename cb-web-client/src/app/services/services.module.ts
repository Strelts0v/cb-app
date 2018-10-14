import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MapSearchService } from './map-search.service';
import { RestaurantService } from './restaurant.service';
import { MessageService } from './message.service';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from '@angular/http';
import { InMemoryDataService } from './in-memory/in-memory-data.service';
import { OrganizationService } from './organization.service';
import { RestaurantCommunicationService } from './restaurant-communication.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HttpModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
  ],
  providers: [
    MapSearchService,
    RestaurantCommunicationService,
    RestaurantService,
    OrganizationService,
    MessageService,
    AuthService,
    InMemoryDataService
  ]
})
export class ServicesModule {
}
