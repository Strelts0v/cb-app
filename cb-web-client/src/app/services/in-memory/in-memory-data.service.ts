import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Restaurant } from '../../data/restaurant';
import { Organization } from '../../data/organization';
import { GeoLocationData } from 'src/app/constants/geo-location.constant';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    // Organization collection
    const organizations: Organization[] = [
      {
        id: 1,
        name: 'McDonalds',
        description: 'Fast food restaurant',
        icon: {
          url: '/assets/restaurants-logo/mcdonalds.png',
          scaledSize: {
            width: 30,
            height: 30,
          }
        },
      },
      {
        id: 1,
        name: 'KFC',
        description: 'Fast food restaurant',
        icon: {
          url: '/assets/restaurants-logo/kfc.png',
          scaledSize: {
            width: 30,
            height: 30,
          }
        },
      }
    ];

    // Restaurants collection
    const restaurants: Restaurant[] = [
      {
        id: 1,
        organizationId: 2,
        name: 'KFC',
        location: {
          lat: 53.9147,
          lng: 27.5680,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
        organizationId: 1,
        name: 'McDonalds',
        location: {
          lat: 53.9208,
          lng: 27.5600,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
        id: 3,
        organizationId: 1,
        name: 'McDonalds',
        location: {
          lat: 53.9367,
          lng: 27.5750,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
        id: 4,
        organizationId: 1,
        name: 'McDonalds',
        location: {
          lat: 53.9017,
          lng: 27.5680,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
        id: 5,
        organizationId: 1,
        name: 'McDonalds',
        location: {
          lat: 53.9017,
          lng: 27.5765,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
        id: 6,
        organizationId: 1,
        name: 'McDonalds',
        location: {
          lat: 53.9207,
          lng: 27.5885,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
        id: 7,
        organizationId: 1,
        name: 'McDonalds',
        location: {
          lat: 53.9033,
          lng: 27.5651,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
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
      },
      {
        id: 8,
        organizationId: 2,
        name: 'KFC',
        location: {
          lat: 53.1147,
          lng: 27.1680,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lat: 53.1147,
            lng: 27.1680,
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
        id: 9,
        organizationId: 2,
        name: 'KFC',
        location: {
          lat: 53.5147,
          lng: 27.2680,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lat: 53.5147,
            lng: 27.2680,
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
        id: 10,
        organizationId: 2,
        name: 'KFC',
        location: {
          lat: 54.2147,
          lng: 27.0680,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lat: 54.2147,
            lng: 27.0680,
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
        id: 11,
        organizationId: 2,
        name: 'KFC',
        location: {
          lat: 54.9347,
          lng: 28.5280,
          country: 'Belarus',
          city: 'Minsk',
          zoom: GeoLocationData.DEFAULT_ZOOM,
          marker: {
            lat: 53.9347,
            lng: 27.5280,
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
    ];

    return {organizations, restaurants};
  }
}
