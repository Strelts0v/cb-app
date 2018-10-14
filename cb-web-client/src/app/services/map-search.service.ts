import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from './../data/location';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  // Observable sources
  private locationSource = new Subject<Location>();

  // Observable streams
  location$ = this.locationSource.asObservable();

  constructor() { }

  sendUpdatedLocation(location: Location) {
    this.locationSource.next(location);
  }
}
