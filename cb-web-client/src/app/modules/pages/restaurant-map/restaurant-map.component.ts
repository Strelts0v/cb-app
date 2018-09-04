import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.scss']
})
export class RestaurantMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;

  latitude;
  longitude;

  constructor() { }

  ngOnInit() {
    this.initCurrentPosition();
    const mapProp = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  private initCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentCoords);
    }
  }

  private setCurrentCoords(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitde;
  }
}
