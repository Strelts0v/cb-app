import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

import { MapSearchService } from './map-search.service';

import { Location } from './data/location';
import { Marker } from './data/marker';
import { GeoLocationData } from '../../../constants/geo-location.constant';

declare var google: any;

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.scss'],
  providers: [ MapSearchService ],
})
export class RestaurantMapComponent implements OnInit {

  public geocoder: any;

  location: Location;
  searchAreaRadius: number;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private mapSearchService: MapSearchService) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;

    this.initGoogleMapsGeocoder();
    this.initMapSearchService(mapSearchService);
  }

  ngOnInit() {
    this.initCurrentLocation();
    this.initCurrentSearchAreaRadius();
  }

  private initCurrentLocation() {
    this.initCurrentLocationWithDefaultData();
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.location = {
          lng: +pos.coords.longitude,
          lat: +pos.coords.latitude,
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lng: +pos.coords.longitude,
            lat: +pos.coords.latitude,
            draggable: true
          },
        }
      })
    }
  }

  private initCurrentLocationWithDefaultData(){
    let marker: Marker = {
      lat: GeoLocationData.DEFAULT_LATITUDE,
      lng: GeoLocationData.DEFAULT_LONGITUDE,
      draggable: true
    };
    
    this.location = {
      lat: GeoLocationData.DEFAULT_LATITUDE,
      lng: GeoLocationData.DEFAULT_LONGITUDE,
      marker: marker,
      zoom: GeoLocationData.DEFAULT_ZOOM
    };
  }

  private initCurrentSearchAreaRadius() {
    this.searchAreaRadius = GeoLocationData.DEFAULT_SEARCH_AREA_RADIUS;
  }

  private initGoogleMapsGeocoder() {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  private initMapSearchService(mapSearchService: MapSearchService) {
    mapSearchService.location$.subscribe(
      location => {
        this.location = location;
        this.onUpdateMapLocation();
      }
    );
    mapSearchService.searchAreaRadius$.subscribe(
      searchAreaRadius => {
        this.searchAreaRadius = searchAreaRadius;
      }
    )
  }

  onUpdateMapLocation() {
    let fullAddress: string = this.location.street || ""
    if (this.location.city) fullAddress = fullAddress + " " + this.location.city
    if (this.location.state) fullAddress = fullAddress + " " + this.location.state
    if (this.location.country) fullAddress = fullAddress + " " + this.location.country

    this.findLocation(fullAddress);
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.city = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  markerDragEnd(m: any, $event: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    })
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;

    for (let element of address) {
      if (element.length == 0 && !element['types']) continue

      if (element['types'].indexOf('street_number') > -1) {
        this.location.street = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.street += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.city = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.zip = element['long_name'];
        continue;
      }
    }
  }
}
