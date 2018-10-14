import { Location } from './location';

export class Restaurant {

    static readonly EMPTY_RESTAURANT: {
        id: 0,
        organizationId: 0,
        name: '',
        location: {
          lat: 0,
          lng: 0,
          country: '',
          city: '',
          marker: {
            lat: 0,
            lng: 0,
            draggable: false,
            iconAnchorX: 0,
            iconAnchorY: 0,
            iconHeight: 0,
            iconWidth: 0,
            icon: {
              url: '',
              scaledSize: {
                width: 0,
                height: 0,
              }
            },
            label: ''
          }
        }
    };

    id: number;
    organizationId: number;
    name: string;
    location: Location;
}
