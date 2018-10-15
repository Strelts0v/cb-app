import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../../../data/restaurant';
import { RestaurantService } from '../../../../services/restaurant.service';
import { RestaurantCommunicationService } from 'src/app/services/restaurant-communication.service';
import { MapSearchService } from 'src/app/services/map-search.service';
import { Organization } from 'src/app/data/organization';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { MessageService } from 'src/app/services/message.service';
import { AppStates } from 'src/app/constants/app-states.constant';
import { RestaurantStates } from 'src/app/constants/restaurant-states.constant';

@Component({
  selector: 'app-restaurant-details-form',
  templateUrl: './restaurant-details-form.component.html',
  styleUrls: ['./restaurant-details-form.component.scss']
})
export class RestaurantDetailsFormComponent implements OnInit {

  restaurantId: number;
  restaurant: Restaurant;
  organization: Organization;
  restaurants: Restaurant[];

  private restaurantListUrl: string;

  constructor(
    private restaurantService: RestaurantService,
    private organizationService: OrganizationService,
    private restaurantCommunicationService: RestaurantCommunicationService,
    private mapSearchService: MapSearchService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.initRestaurant();
    this.initMapSearchService();
    this.initRestaurants();
  }

  private initRestaurant() {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId');
    const organizationId = +this.route.parent.snapshot.paramMap.get('organizationId');
    this.organizationService.getOrganization(organizationId).subscribe(
      organization => {
        this.organization = organization;
        this.initRestaurantByCommunicationService();
        this.restaurantListUrl =
          `${AppStates.RESTAURANT_LAYOUT}/${this.organization.id}/${RestaurantStates.RESTAURANT_CONTROL}`;
      }
    );
  }

  private initMapSearchService() {
    this.mapSearchService.location$.subscribe(
      location => {
        this.restaurant.location = location;
      }
    );
  }

  private initRestaurantByCommunicationService() {
    this.restaurantCommunicationService.handledRestaurant$.subscribe (
      restaurant => {
        this.restaurant = restaurant;
      }
    );
  }

  private initRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.restaurants = restaurants;
      }
    );
  }

  saveRestaurant() {
    if (this.restaurant.id === 0) {
      this.addRestaurant();
    } else {
      this.updateRestaurant();
    }
  }

  private addRestaurant() {
    this.restaurant.id = this.getNewId();
    this.restaurantService.addRestaurant(this.restaurant)
      .subscribe(addedRestaurant => {
        this.restaurant = addedRestaurant;
        this.initRestaurants();
        this.messageService.notify(`New restaurant has been successfully added!`);
        this.router.navigate([this.restaurantListUrl]);
      }
    );
  }

  private updateRestaurant() {
    this.restaurantService.updateRestaurant(this.restaurant)
      .subscribe(_ => {
        this.initRestaurants();
        this.messageService.notify(`Restaurant has been successfully updated!`);
      }
    );
  }

  private getNewId() {
    return this.restaurants.length + 1;
  }

}
