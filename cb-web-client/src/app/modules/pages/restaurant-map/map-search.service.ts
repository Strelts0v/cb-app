import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Location } from './data/location';
import { Marker } from './data/marker';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  // Observable sources
  private locationSource = new Subject<Location>();
  private searchAreaRadiusSource = new Subject<number>();
  
  // Observable streams
  location$ = this.locationSource.asObservable();
  searchAreaRadius$ = this.searchAreaRadiusSource.asObservable();

  constructor() { }

  sendUpdatedLocation(location: Location) {
    this.locationSource.next(location);
  }

  sendUpdatedSearchAreaRadius(searchAreaRadius: number) {
    this.searchAreaRadiusSource.next(searchAreaRadius);
  }

}
