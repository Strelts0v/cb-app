import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material';
import { Location } from './../../../../data/location';
import { Marker } from './../../../../data/marker';
import { GeoLocationData } from './../../../../constants/geo-location.constant';
import { MapSearchService } from './../../../../services/map-search.service';

@Component({
  selector: 'app-map-search-form',
  templateUrl: './map-search-form.component.html',
  styleUrls: ['./map-search-form.component.scss']
})
export class MapSearchFormComponent implements OnInit {

  location: Location;
  searchAreaRadius: number;

  constructor(private mapSearchService: MapSearchService) {
  }

  ngOnInit() {
    this.initCurrentLocation();
    this.initCurrentLocationWithDefaultData();
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

  searchByLocation() {
    this.mapSearchService.sendUpdatedLocation(this.location);
  }

  onChangedSearchAreaRadius() {
    this.mapSearchService.sendUpdatedSearchAreaRadius(this.searchAreaRadius);
  }

  milesToSearchAreaRadius(value) {
    this.searchAreaRadius = value;
    this.onChangedSearchAreaRadius();
  }

  searchAreaRadiusInMiles() {
    return this.searchAreaRadius;
  }

}
