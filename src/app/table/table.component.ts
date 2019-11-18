import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {LocationService} from '../shared/services/location-service/location.service';
import {ConfirmationDialogComponent} from '../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {SaveLocationComponent} from '../save-location/save-location.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  spinner = true;
  dataSource;
  data;

  constructor(private locationService: LocationService,
              public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['city', 'state', 'longitude', 'latitude', 'locationId'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    console.log(this.data);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations = () => {
    this.locationService.getLocations().subscribe((resData: any[]) => {
      this.data = resData;
      this.dataSource = new MatTableDataSource(resData);
      this.dataSource.paginator = this.paginator;
      this.spinner = false;

      this.dataSource.filterPredicate = (data, filter: string): boolean => {
        return data.city.name.toLowerCase().includes(filter) || data.city.state.name.toLowerCase().includes(filter) ||
          data.longitude.toLowerCase().includes(filter) || data.latitude.toLowerCase().includes(filter) ||
          data.id.toString().toLowerCase().includes(filter) === filter;
      };
    });
  }

  select(element: any) {
    this.locationService.selectedLocation.next(element);
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.deleteLocation(id).subscribe(res => {
          this.getLocations();
        });
      }
    });
  }

  openCreateNewLocationDialog() {
    const dialogRef = this.dialog.open(SaveLocationComponent, {
      width: '850px',
      data: '0'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLocations();
    });
  }
}
