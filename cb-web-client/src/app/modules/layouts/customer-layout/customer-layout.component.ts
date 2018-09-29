import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {

  showExtendedMenu: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.showExtendedMenu = false;
  }

  onLogoutClick() {
    this.authService.logOut();
  }

}
