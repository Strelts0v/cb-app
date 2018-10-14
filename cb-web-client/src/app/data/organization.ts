import { Icon } from './icon';

export class Organization {

    static readonly EMPTY_ORGANIZATION: {
        id: 0,
        name: '',
        description: '',
        icon: {
            url: '',
              scaledSize: {
                width: 0,
                height: 0,
              }
        }
    };

    id: number;
    name: string;
    description: string;
    icon: Icon;
}
