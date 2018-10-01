import { Location } from './location';

export interface Restaurant {
    id: number;
    organizationId: number;
    name: string;
    location: Location;
}
