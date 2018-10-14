import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { MapSearchService } from './../../../services/map-search.service';
import { Location } from './../../../data/location';
import { Marker } from './../../../data/marker';
import { GeoLocationData } from './../../../constants/geo-location.constant';
import { Restaurant } from '../../../data/restaurant';
import { RestaurantService } from './../../../services/restaurant.service';
import { MessageService } from '../../../services/message.service';

declare var google: any;

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.scss'],
  providers: [ MapSearchService ],
})
export class RestaurantMapComponent implements OnInit {

  public geocoder: any;

  userLocation: Location;
  restaurants: Restaurant[];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private mapSearchService: MapSearchService,
    private restaurantService: RestaurantService,
    private messageService: MessageService) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;

    this.initGoogleMapsGeocoder();
    this.initMapSearchService(mapSearchService);
  }

  ngOnInit() {
    this.initCurrentLocation();
    this.initNearestRestaurants();
  }

  private initCurrentLocation() {
    this.initCurrentLocationWithDefaultData();
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.userLocation = {
          lng: +pos.coords.longitude,
          lat: +pos.coords.latitude,
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lng: +pos.coords.longitude,
            lat: +pos.coords.latitude,
            draggable: true
          },
        };
      });
    }
  }

  private initCurrentLocationWithDefaultData() {
    const marker: Marker = {
      lat: GeoLocationData.DEFAULT_LATITUDE,
      lng: GeoLocationData.DEFAULT_LONGITUDE,
      draggable: true
    };

    this.userLocation = {
      lat: GeoLocationData.DEFAULT_LATITUDE,
      lng: GeoLocationData.DEFAULT_LONGITUDE,
      marker: marker,
      zoom: GeoLocationData.DEFAULT_ZOOM
    };
  }

  private initGoogleMapsGeocoder() {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  private initMapSearchService(mapSearchService: MapSearchService) {
    mapSearchService.location$.subscribe(
      location => {
        this.userLocation = location;
        this.onUpdateMapLocation();
      }
    );
  }

  private initNearestRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.restaurants = restaurants;
      }
    );
  }

  onUpdateMapLocation() {
    let fullAddress: string = this.userLocation.street || '';
    if (this.userLocation.city) { fullAddress = fullAddress + ' ' + this.userLocation.city; }
    if (this.userLocation.state) { fullAddress = fullAddress + ' ' + this.userLocation.state; }
    if (this.userLocation.country) { fullAddress = fullAddress + ' ' + this.userLocation.country; }

    this.findLocation(fullAddress);
  }

  findLocation(address) {
    if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status === google.maps.GeocoderStatus.OK) {
        for (let i = 0; i < results[0].address_components.length; i++) {
          const types = results[0].address_components[i].types;

          if (types.indexOf('locality') !== -1) {
            this.userLocation.city = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.userLocation.country = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.userLocation.zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.userLocation.state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.userLocation.lat = results[0].geometry.location.lat();
          this.userLocation.lng = results[0].geometry.location.lng();
          this.userLocation.marker.lat = results[0].geometry.location.lat();
          this.userLocation.marker.lng = results[0].geometry.location.lng();
          this.userLocation.marker.draggable = true;
          this.userLocation.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert(`Sorry, this search produced no results.`);
      }
    });
  }

  markerDragEnd(m: any, $event: any) {
    this.userLocation.marker.lat = m.coords.lat;
    this.userLocation.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.userLocation.marker.lat,
        lng: this.userLocation.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    });
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length === 0) { return false; }
    const address = addressArray[0].address_components;

    for (const element of address) {
      if (element.length === 0 && !element['types']) { continue; }

      if (element['types'].indexOf('street_number') > -1) {
        this.userLocation.street = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.userLocation.street += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.userLocation.city = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.userLocation.state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.userLocation.country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.userLocation.zip = element['long_name'];
        continue;
      }
    }
  }

  onRestaurantLocationMarkerClick(restaurant: Restaurant) {
    this.log('On Marker click handler');
  }

  private log(message: string) {
    this.messageService.add(`RestaurantMapComponent: ${message}`);
  }
}
