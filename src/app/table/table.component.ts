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
  dataSource;
  data;

  constructor(private locationService: LocationService,
              public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['city', 'state', 'longitude', 'latitude', 'locationId'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getLocations();
  }

  getLocations = () => {
    this.locationService.getLocations().subscribe((data: any[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  };

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
