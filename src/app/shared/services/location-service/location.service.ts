import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  selectedLocation: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get('http://localhost:8080/api/location');
  }

  public submitLocation(location: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/location`, location);
  }

  private handleError(err) {
    return throwError(err);
  }

  private getHeader() {
    const headerProperties = {
      'Content-Type': 'application/json',
      responseType: 'text'
    };
    return new HttpHeaders(headerProperties);
  }
}
