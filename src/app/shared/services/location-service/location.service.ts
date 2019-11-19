import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {LocationModel} from '../../models/location.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  location_api = environment.location_api;

  selectedLocation: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  passLocationToSaveModal: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  public getLocations() {
    return this.http.get(this.location_api);
  }

  public submitLocation(location: any): Observable<LocationModel> {
    return this.http.put<LocationModel>(this.location_api, location);
  }

  public deleteLocation(id: number) {
    return this.http.delete(this.location_api + '/' + id);
  }

  public getLocationById(id: number) {
    return this.http.get(this.location_api + '/' + id);
  }

  public saveLocation(location: LocationModel): Observable<LocationModel> {
    return this.http.post<LocationModel>(this.location_api, location);
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
