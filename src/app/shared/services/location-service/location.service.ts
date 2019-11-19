import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {LocationModel} from '../../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  selectedLocation: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  passLocationToSaveModal: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  public getLocations() {
    return this.http.get('http://localhost:8080/api/location');
  }

  public submitLocation(location: any): Observable<LocationModel> {
    return this.http.put<LocationModel>(`http://localhost:8080/api/location`, location);
  }

  public deleteLocation(id: number) {
    return this.http.delete('http://localhost:8080/api/location/' + id);
  }

  public getLocationById(id: number) {
    return this.http.get('http://localhost:8080/api/location/' + id);
  }

  public saveLocation(location: LocationModel): Observable<LocationModel> {
    return this.http.post<LocationModel>(`http://localhost:8080/api/location`, location);
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
