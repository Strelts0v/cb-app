import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppStates } from './constants/app-states.constant';
import { AuthComponent } from './modules/pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: AppStates.AUTH,
    pathMatch: 'full'
  },

  {
    path: AppStates.AUTH,
    component: AuthComponent
  },

  // Customer layout parent
  {
    path: AppStates.CUSTOMER_LAYOUT,
    loadChildren: './modules/layouts/customer-layout/customer-layout.module#CustomerLayoutModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  // Restaurant layout parent
  {
    path: `${AppStates.RESTAURANT_LAYOUT}/:organizationId`,
    loadChildren: './modules/layouts/restaurant-layout/restaurant-layout.module#RestaurantLayoutModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
