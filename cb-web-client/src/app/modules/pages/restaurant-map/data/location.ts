import { Marker } from './marker';

export interface Location {
    lat: number;
    lng: number;
    viewport?: Object;
    zoom: number;
    street?: string;
    city?: string;
    country?: string;
    zip?: string;
    state?: string;
    marker?: Marker;
}