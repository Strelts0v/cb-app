import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Endpoints } from '../constants/endpoint.constant';
import { Organization } from '../data/organization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(Endpoints.ORGANIZATIONS)
      .pipe(
        tap(organizations => this.log('fetched organizations count: ' + organizations.length)),
        catchError(this.handleError('getRestaurants', []))
      );
  }

  getOrganization(organizationId: number): Observable<Organization> {
    const url = `${Endpoints.ORGANIZATIONS}/${organizationId}`;
    return this.http.get<Organization>(url)
      .pipe(
        tap(_ => this.log(`fetched organization id=${organizationId}`)),
        catchError(this.handleError<Organization>(`getOrganization id=${organizationId}`))
      );
  }

  updateOrganization(organization: Organization): Observable<any> {
    const url = `${Endpoints.ORGANIZATIONS}`;
    return this.http.put(url, organization, httpOptions)
      .pipe(
        tap(_ => this.log(`updated organization id=${organization.id}`)),
        catchError(this.handleError<any>(`updateOrganization`))
      );
  }

  addOrganization(organization: Organization): Observable<Organization> {
    const url = `${Endpoints.ORGANIZATIONS}`;
    return this.http.post<Organization>(url, organization, httpOptions)
      .pipe(
        tap((org: Organization) => this.log(`added organization id=${org.id}`)),
        catchError(this.handleError<Organization>('addOrganization'))
      );
  }

  deleteOrganization(organization: Organization | number): Observable<Organization> {
    const id = typeof organization === 'number' ? organization : organization.id;
    const url = `${Endpoints.ORGANIZATIONS}/${id}`;

    return this.http.delete<Organization>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted organization id=${id}`)),
        catchError(this.handleError<Organization>('deleteOrganization'))
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
