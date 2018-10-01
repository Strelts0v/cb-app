import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantStates } from '../../../constants/restaurant-states.constant';
import { AppStates } from '../../../constants/app-states.constant';
import { Organization } from '../../../data/organization';
import { OrganizationService } from '../../../services/organization.service';
import { RestaurantCommunicationService } from '../../../services/restaurant-communication.service';

@Component({
  selector: 'app-restaurant-layout',
  templateUrl: './restaurant-layout.component.html'
})
export class RestaurantLayoutComponent implements OnInit {

  private restaurantListUrl: string;
  private restaurantDetailsUrl: string;
  private organizationUrl: string;

  @Input() organization: Organization;

  constructor(
    private authService: AuthService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantCommunicationService: RestaurantCommunicationService) { }

  ngOnInit() {
    this.initRestaurantCommunicationService();
    this.initOrganization();
  }

  private initOrganization() {
    const organizationId: number = +this.route.snapshot.paramMap.get('id');
    this.organizationService.getOrganization(organizationId)
      .subscribe(organization => {
        this.organization = organization;
        this.initUrls();
        this.restaurantCommunicationService.sendUpdatedOrganization(organization);
      });
  }

  private initUrls() {
    this.restaurantListUrl = `${AppStates.RESTAURANT_LAYOUT}` +
      `/${this.organization.id}/${RestaurantStates.RESTAURANT_CONTROL}`;

    this.restaurantDetailsUrl = `${AppStates.RESTAURANT_LAYOUT}` +
      `/${this.organization.id}/${RestaurantStates.RESTAURANT_DETAILS}`;

    this.organizationUrl = `${AppStates.RESTAURANT_LAYOUT}` +
      `/${this.organization.id}/${RestaurantStates.ORGANIZATION_DETAILS}`;
  }

  private initRestaurantCommunicationService() {
    this.restaurantCommunicationService.organization$.subscribe(
      organization => {
        this.organization = organization;
      }
    );
  }

  onLogoutClick() {
    this.authService.logOut();
  }

  onClickRestaurantList() {
    this.router.navigate([this.restaurantListUrl]);
  }

  onClickAddRestaurant() {
    this.router.navigate([this.restaurantDetailsUrl]);
  }

  onClickOrganizationSettings() {
    this.router.navigate([`${this.organizationUrl}/`]);
  }

}
