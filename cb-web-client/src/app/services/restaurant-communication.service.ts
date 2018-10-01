import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Organization } from '../data/organization';
import { Restaurant } from '../data/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantCommunicationService {

  // Observable sources
  private organizationSource = new BehaviorSubject<Organization>(Organization.EMPTY_ORGANIZATION);
  private restaurantsSource = new BehaviorSubject<Restaurant[]>([]);

  // Observable streams
  organization$ = this.organizationSource.asObservable();
  restaurants$ = this.restaurantsSource.asObservable();

  constructor() { }

  sendUpdatedOrganization(organization: Organization) {
    this.organizationSource.next(organization);
  }

  sendUpdatedRestaurants(restaurants: Restaurant[]) {
    this.restaurantsSource.next(restaurants);
  }
}
