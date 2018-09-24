import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { RestaurantLocation } from '../data/restaurant-location';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private readonly RESTAURANTS_URL = 'api/restaurantLocations';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRestaurantLocations(): Observable<RestaurantLocation[]> {
    return this.http.get<RestaurantLocation[]>(this.RESTAURANTS_URL)
      .pipe(
        tap(restaurantLocations => this.log('fetched restaurant locations')),
        catchError(this.handleError('getRestaurantsLocations', []))
      );
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        this.log(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  private log(message: string) {
    this.messageService.add(`RestaurantService: ${message}`);
  }
}
