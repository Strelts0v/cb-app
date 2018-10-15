import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../../../data/restaurant';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RestaurantService } from '../../../services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantCommunicationService } from '../../../services/restaurant-communication.service';
import { Organization } from '../../../data/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-restaurant-control',
  templateUrl: './restaurant-control.component.html',
  styleUrls: ['./restaurant-control.component.scss']
})
export class RestaurantControlComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'country', 'city', 'street'];
  dataSource = new MatTableDataSource<Restaurant>();
  selection = new SelectionModel<Restaurant>(true, []);
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

  isAllRowsSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRowsSelected() {
    this.isAllRowsSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onRestaurantClick(restaurantId: number) {
    const restaurantDetailsUrl = `restaurant/${this.organization.id}/details/${restaurantId}`;
    this.router.navigate([restaurantDetailsUrl]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSelectedRestaurants() {
    const restaurants = this.selection.selected;
    let index = 0;
    restaurants.forEach(restaurant => {
      this.restaurantService.deleteRestaurant(restaurant).subscribe(
        _ => {
          index++;
          if (index === restaurants.length) {
            this.initRestaurants();
          }
        });
    });
  }

}
