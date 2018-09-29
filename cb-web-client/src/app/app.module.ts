import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/shared/material/material.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ServicesModule } from './services/services.module';
import { InMemoryRestaurantService } from './services/in-memory/in-memory-restaurants.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { GuardsModule } from './guards/guards.module';
import { AuthModule } from './modules/pages/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryRestaurantService, { dataEncapsulation: false }
    ),
    ServicesModule,
    GuardsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
