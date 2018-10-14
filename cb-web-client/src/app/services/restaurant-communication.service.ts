import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Organization } from '../data/organization';
import { Restaurant } from '../data/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantCommunicationService {

  // Observable sources
  private organizationSource = new Subject<Organization>();
  private handledRestaurantSource = new Subject<Restaurant>();
  private restaurantsSource = new Subject<Restaurant[]>();

  // Observable streams
  organization$ = this.organizationSource.asObservable();
  handledRestaurant$ = this.handledRestaurantSource.asObservable();
  restaurants$ = this.restaurantsSource.asObservable();

  constructor() { }

  sendUpdatedOrganization(organization: Organization) {
    this.organizationSource.next(organization);
  }

  sendUpdatedHandledRestaurant(restaurant: Restaurant) {
    this.handledRestaurantSource.next(restaurant);
  }

  sendUpdatedRestaurants(restaurants: Restaurant[]) {
    this.restaurantsSource.next(restaurants);
  }
}
