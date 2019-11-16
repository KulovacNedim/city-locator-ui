import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {LocationService} from '../shared/services/location.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource;
  data;
  constructor(private locationService: LocationService) {
  }

  displayedColumns: string[] = ['city', 'state', 'longitude', 'latitude', 'locationId'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.locationService.getLocations().subscribe((data: any[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  select(element: any) {
    this.locationService.selectedLocation.next(element);
  }
}
