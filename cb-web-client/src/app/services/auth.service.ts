import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../constants/auth.constant';
import { AppStates } from '../constants/app-states.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  logIn() {
    localStorage.setItem(AuthConstants.AUTH_TOKEN_NAME, 'test-token');
  }

  logOut() {
    if (confirm('Are you sure you want to logout')) {
      localStorage.removeItem(AuthConstants.AUTH_TOKEN_NAME);
      this.router.navigate([AppStates.AUTH]);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AuthConstants.AUTH_TOKEN_NAME);
  }
}
