import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RestaurantLocation } from '../../data/restaurant-location';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class InMemoryRestaurantService implements InMemoryDbService {

  createDb() {
    const restaurantLocations: RestaurantLocation[] = [
      {
        id: 1,
        location: {
          lat: 53.9147,
          lng: 27.5680,
          marker: {
            lat: 53.9147,
            lng: 27.5680,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/kfc.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'KFC'
          }
        }
      },
      {
        id: 2,
        location: {
          lat: 53.9208,
          lng: 27.5600,
          marker: {
            lat: 53.9208,
            lng: 27.5600,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/mcdonalds.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'McDonalds'
          }
        }
      },
      {
        id: 5,
        location: {
          lat: 53.9367,
          lng: 27.5750,
          marker: {
            lat: 53.9367,
            lng: 27.5750,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/mcdonalds.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'McDonalds'
          }
        }
      },
      {
        id: 6,
        location: {
          lat: 53.9017,
          lng: 27.5680,
          marker: {
            lat: 53.9017,
            lng: 27.5680,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/mcdonalds.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'McDonalds',
          }
        }
      },
      {
        id: 7,
        location: {
          lat: 53.9017,
          lng: 27.5765,
          marker: {
            lat: 53.9017,
            lng: 27.5765,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/mcdonalds.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'McDonalds',
          }
        }
      },
      {
        id: 8,
        location: {
          lat: 53.9207,
          lng: 27.5885,
          marker: {
            lat: 53.9207,
            lng: 27.5885,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/mcdonalds.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'McDonalds'
          }
        }
      },
      {
        id: 9,
        location: {
          lat: 53.9033,
          lng: 27.5651,
          marker: {
            lat: 53.9033,
            lng: 27.5651,
            draggable: false,
            iconAnchorX: 10,
            iconAnchorY: 10,
            iconHeight: 20,
            iconWidth: 20,
            icon: {
              url: '/assets/restaurants-logo/mcdonalds.png',
              scaledSize: {
                width: 30,
                height: 30,
              }
            },
            label: 'McDonalds',
          }
        }
      }
    ];

    return {restaurantLocations};
  }
}
