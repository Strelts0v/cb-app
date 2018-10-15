import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AppStates } from '../../../constants/app-states.constant';
import { RestaurantStates } from '../../../constants/restaurant-states.constant';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html'
})
export class CustomerLayoutComponent implements OnInit {

  showExtendedMenu: boolean;

  private readonly defaultOrganizationId: number = 1;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.showExtendedMenu = false;
  }

  onLogoutClick() {
    this.authService.logOut();
  }

  onClickRestaurantsLayout() {
    this.router.navigate([
      `${AppStates.RESTAURANT_LAYOUT}/${this.defaultOrganizationId}/${RestaurantStates.RESTAURANT_CONTROL}`
    ]);
  }

}
