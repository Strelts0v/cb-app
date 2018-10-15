import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Restaurant } from '../data/restaurant';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Endpoints } from '../constants/endpoint.constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(Endpoints.RESTAURANTS)
      .pipe(
        tap(restaurants => this.log('fetched restaurants count: ' + restaurants.length)),
        catchError(this.handleError('getRestaurants', []))
      );
  }

  getRestaurant(id: number): Observable<Restaurant> {
    const url = `${Endpoints.RESTAURANTS}/${id}`;
    return this.http.get<Restaurant>(url)
      .pipe(
        tap(_ => this.log(`fetched restaurant id=${id}`)),
        catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
      );
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    const url = `${Endpoints.RESTAURANTS}`;
    return this.http.put(url, restaurant, httpOptions)
      .pipe(
        tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
        catchError(this.handleError<any>(`updateRestaurant`))
      );
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${Endpoints.RESTAURANTS}`;
    return this.http.post<Restaurant>(url, restaurant, httpOptions)
      .pipe(
        tap((rest: Restaurant) => this.log(`added restaurant id=${rest.id}`)),
        catchError(this.handleError<Restaurant>('addRestaurant'))
      );
  }

  deleteRestaurant(restaurant: Restaurant | number): Observable<Restaurant> {
    const id = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${Endpoints.RESTAURANTS}/${id}`;
    return this.http.delete<Restaurant>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted restaurant id=${id}`)),
        catchError(this.handleError<Restaurant>('deleteRestaurant'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`RestaurantService: ${message}`);
  }
}
