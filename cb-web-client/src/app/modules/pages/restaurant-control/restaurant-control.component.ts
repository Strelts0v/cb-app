import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../../../data/restaurant';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RestaurantService } from '../../../services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantCommunicationService } from '../../../services/restaurant-communication.service';
import { Organization } from '../../../data/organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-restaurant-control',
  templateUrl: './restaurant-control.component.html',
  styleUrls: ['./restaurant-control.component.scss']
})
export class RestaurantControlComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'country', 'city', 'street'];
  dataSource = new MatTableDataSource<Restaurant>();
  organization: Organization;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.initOrganization();
    this.initRestaurants();
  }

  private initOrganization() {
    const organizationId = +this.route.parent.snapshot.paramMap.get('organizationId');
    this.organizationService.getOrganization(organizationId).subscribe(
      organization => {
        this.organization = organization;
      }
    );
  }

  private initRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.dataSource.data = restaurants;
      }
    );
  }

  onRestaurantClick(restaurantId: number) {
    const restaurantDetailsUrl = `restaurant/${this.organization.id}/details/${restaurantId}`;
    this.router.navigate([restaurantDetailsUrl]);
  }

}
