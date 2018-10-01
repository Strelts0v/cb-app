import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../../../data/restaurant';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RestaurantService } from '../../../services/restaurant.service';
import { Router } from '@angular/router';
import { RestaurantCommunicationService } from '../../../services/restaurant-communication.service';
import { Organization } from '../../../data/organization';

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
    private restaurantCommunicationService: RestaurantCommunicationService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.initRestaurantCommunicationService();
    this.initRestaurants();
  }

  private initRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      restaurants => {
        this.dataSource.data = restaurants;
      }
    );
  }

  private initRestaurantCommunicationService() {
    this.restaurantCommunicationService.organization$.subscribe(
      organization => {
        this.organization = organization;
      }
    );
    this.restaurantCommunicationService.restaurants$.subscribe(
      restaurants => {
        this.dataSource.data = restaurants;
      }
    );
  }

  onRestaurantClick() {
    console.log('on restaurant edit click handler');
  }

}
