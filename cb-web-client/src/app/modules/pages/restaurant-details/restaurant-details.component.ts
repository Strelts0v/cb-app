import { Component, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { MapSearchService } from './../../../services/map-search.service';
import { Location } from './../../../data/location';
import { Marker } from './../../../data/marker';
import { GeoLocationData } from './../../../constants/geo-location.constant';
import { Restaurant } from '../../../data/restaurant';
import { RestaurantService } from './../../../services/restaurant.service';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../../services/organization.service';
import { Organization } from '../../../data/organization';
import { RestaurantCommunicationService } from 'src/app/services/restaurant-communication.service';

declare var google: any;

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {

  geocoder: any;
  organization: Organization;
  restaurant: Restaurant;
  restaurantLocation: Location;
  restaurantId: number;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private mapSearchService: MapSearchService,
    private restaurantService: RestaurantService,
    private organizationService: OrganizationService,
    private messageService: MessageService,
    private restaurantCommunicationService: RestaurantCommunicationService,
    private route: ActivatedRoute) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
  }

  ngOnInit() {
    this.initCurrentLocationWithDefaultData();
    this.initRestaurantWithDefaultSettings();
    this.initGoogleMapsGeocoder();
    this.initMapSearchService();
    this.initCurrentRestaurant();
  }

  private initCurrentLocationWithDefaultData() {
    const marker: Marker = {
      lat: GeoLocationData.DEFAULT_LATITUDE,
      lng: GeoLocationData.DEFAULT_LONGITUDE,
      draggable: true
    };

    this.restaurantLocation = {
      lat: GeoLocationData.DEFAULT_LATITUDE,
      lng: GeoLocationData.DEFAULT_LONGITUDE,
      marker: marker,
      zoom: GeoLocationData.DEFAULT_ZOOM
    };
  }

  private initRestaurantWithDefaultSettings() {
    this.restaurant = {
      id: 0,
      organizationId: 0,
      name: '',
      location: this.restaurantLocation
    };
  }

  private initCurrentRestaurant() {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId');
    const organizationId = +this.route.parent.snapshot.paramMap.get('organizationId');
    this.organizationService.getOrganization(organizationId).subscribe(
      organization => {
        this.organization = organization;
        if (this.restaurantId) {
          this.initEditRestaurantScenario(this.restaurantId);
        } else {
          this.initAddRestaurantScenario();
        }
      }
    );
  }

  private initEditRestaurantScenario(restaurantId: number) {
    this.restaurantService.getRestaurant(restaurantId).subscribe(
      restaurant => {
        this.restaurant = restaurant;
        this.restaurantCommunicationService.sendUpdatedHandledRestaurant(restaurant);
        this.initMapSearchService();
      }
    );
  }

  private initAddRestaurantScenario() {
    this.initCurrentLocation();
  }

  private initCurrentLocation() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.restaurantLocation = {
          lng: +pos.coords.longitude,
          lat: +pos.coords.latitude,
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lng: +pos.coords.longitude,
            lat: +pos.coords.latitude,
            draggable: true
          },
        };
        this.initRestaurantForAdding();
      });
    }
  }

  private initRestaurantForAdding() {
    this.restaurant.organizationId = this.organization.id;
    this.restaurant.name = this.organization.name;
    this.restaurantCommunicationService.sendUpdatedHandledRestaurant(this.restaurant);
    this.initMapSearchService();
  }

  private initGoogleMapsGeocoder() {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  private initMapSearchService() {
    this.mapSearchService.location$.subscribe(
      location => {
        this.restaurant.location = this.restaurantLocation = location;
        this.onUpdateMapLocation();
      }
    );
  }

  onUpdateMapLocation() {
    let fullAddress: string = this.restaurantLocation.street || '';
    if (this.restaurantLocation.city) { fullAddress = fullAddress + ' ' + this.restaurantLocation.city; }
    if (this.restaurantLocation.state) { fullAddress = fullAddress + ' ' + this.restaurantLocation.state; }
    if (this.restaurantLocation.country) { fullAddress = fullAddress + ' ' + this.restaurantLocation.country; }

    this.findLocation(fullAddress);
  }

  findLocation(address) {
    if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        for (let i = 0; i < results[0].address_components.length; i++) {
          const types = results[0].address_components[i].types;

          if (types.indexOf('locality') !== -1) {
            this.restaurantLocation.city = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.restaurantLocation.country = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.restaurantLocation.zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.restaurantLocation.state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.restaurantLocation.lat = results[0].geometry.location.lat();
          this.restaurantLocation.lng = results[0].geometry.location.lng();
          this.restaurantLocation.marker.lat = results[0].geometry.location.lat();
          this.restaurantLocation.marker.lng = results[0].geometry.location.lng();
          this.restaurantLocation.marker.draggable = true;
          this.restaurantLocation.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      }
    });
  }

  markerDragEnd(m: any, $event: any) {
    this.restaurantLocation.marker.lat = m.coords.lat;
    this.restaurantLocation.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.restaurantLocation.marker.lat,
        lng: this.restaurantLocation.marker.lng
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
        this.restaurantLocation.street = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.restaurantLocation.street += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.restaurantLocation.city = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.restaurantLocation.state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.restaurantLocation.country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.restaurantLocation.zip = element['long_name'];
        continue;
      }
    }
  }

  private log(message: string) {
    this.messageService.add(`RestaurantDetailsComponent: ${message}`);
  }

}
