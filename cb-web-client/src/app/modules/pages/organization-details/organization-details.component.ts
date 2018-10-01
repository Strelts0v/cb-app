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

  @Input() organization: Organization;

  constructor(
    private organizationService: OrganizationService,
    private restaurantCommunicationService: RestaurantCommunicationService) { }

  ngOnInit() {
    this.initRestaurantCommunicationService();
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
