import { Icon } from './icon';

export interface Marker {
    lat: number;
    lng: number;
    draggable: boolean;
    iconAnchorX?: number;
    iconAnchorY?: number;
    iconHeight?: number;
    iconWidth?: number;
    icon?: Icon;
    label?: string;
}
