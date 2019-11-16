import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {LocationService} from '../shared/services/location.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  constructor(private locationService: LocationService) {
  }

  displayedColumns: string[] = ['city', 'state', 'longitude', 'latitude', 'locationId'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  locations: any[] = [];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.locationService.getLocations().subscribe((res: any[]) => {
      this.locations = res;
    });

  }
}

export interface PeriodicElement {
  city: string;
  state: string;
  longitude: string;
  latitude: string;
  locationId: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 1.1},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 2.2},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 1.1},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 2.2},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 1.1},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 2.2},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 1.1},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 2.2},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 1.1},
  {city: 'Tesanj', state: 'BiH', longitude: 'longitude', latitude: 'latitude', locationId: 2.2}
];
