import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { AppStates } from '../../../constants/app-states.constant';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private customerUrl: string = AppStates.CUSTOMER_LAYOUT;
  private restaurantUrl: string = AppStates.RESTAURANT_LAYOUT;

  private isLoggedIn: boolean;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logIn() {
    this.authService.logIn();
    this.isLoggedIn = true;
  }

  logOut() {
    this.authService.logOut();
    this.isLoggedIn = false;
  }

  redirectToCustomerLayout() {
    this.router.navigate([this.customerUrl]);
    this.log(`Redirecting to the Customer Layout`);
  }

  redirectToRestaurantLayout() {
    this.router.navigate([this.restaurantUrl]);
    this.log(`Redirecting to the Restaurant Layout`);
  }

  private log(message: string) {
    this.messageService.add(`AuthComponent: ${message}`);
  }

}
