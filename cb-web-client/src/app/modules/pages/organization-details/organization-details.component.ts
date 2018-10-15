import { Component, OnInit, Input } from '@angular/core';
import { OrganizationService } from '../../../services/organization.service';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '../../../data/organization';
import { RestaurantCommunicationService } from '../../../services/restaurant-communication.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  organization: Organization;

  constructor(
    private organizationService: OrganizationService,
    private restaurantCommunicationService: RestaurantCommunicationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initOrganization();
    this.initRestaurantCommunicationService();
  }

  private initOrganization() {
    const organizationId = +this.route.parent.snapshot.paramMap.get('organizationId');
    this.organizationService.getOrganization(organizationId).subscribe(
      organization => {
        this.organization = organization;
        this.initRestaurantCommunicationService();
        this.restaurantCommunicationService.sendUpdatedOrganization(organization);
      }
    );
  }

  private initRestaurantCommunicationService() {
    this.restaurantCommunicationService.organization$.subscribe(
      organization => {
        this.organization = organization;
      }
    );
  }

  saveOrganization() {
    this.organizationService.updateOrganization(this.organization).subscribe(
      _ => {
        this.restaurantCommunicationService.sendUpdatedOrganization(this.organization);
      }
    );
  }
}
