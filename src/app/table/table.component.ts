import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {LocationService} from '../shared/services/location-service/location.service';
import {ConfirmationDialogComponent} from '../shared/modals/confirmation-dialog/confirmation-dialog.component';

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
    this.locationService.getLocations().subscribe((data: any[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  select(element: any) {
    this.locationService.selectedLocation.next(element);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked 1');
        // DO SOMETHING
      }
    });
  }
}
