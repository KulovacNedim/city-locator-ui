import {Component} from '@angular/core';
import {LocationService} from '../shared/services/location-service/location.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {SaveLocationComponent} from '../save-location/save-location.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  title = 'city-locator-ui';
  location: any;
  coords: {
    lat: number
    lng: number
  };
  updated = false;
  newCoords = false;

  constructor(private locationService: LocationService,
              private router: Router,
              private dialog: MatDialog) {
    this.locationService.selectedLocation.subscribe(location => {
      if (!location) {
        this.router.navigateByUrl('/');
      }
      this.location = location;
    });
  }


  onChoseLocation(event) {
    this.coords = event.coords;
    this.newCoords = true;
  }

  updateCoords() {
    this.location.latitude = this.coords.lat;
    this.location.longitude = this.coords.lng;

    this.locationService.submitLocation({
      id: this.location.id,
      latitude: this.coords.lat,
      longitude: this.coords.lng,
      city: {
        id: this.location.city.id,
        name: this.location.city.name,
        state: {
          id: this.location.city.state.id,
          name: this.location.city.state.name
        }
      }
    })
      .subscribe(locRes => {
        if (locRes.id) {
          this.updated = true;
          this.newCoords = false;
          this.triggerUpdateNotificationTimer();
        }
      });
  }

  triggerUpdateNotificationTimer = () => {
    setTimeout(() => {
      this.updated = false;
    }, 2.0 * 1000);
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm update coordinates for ' + this.location.city.name.toUpperCase() + '?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCoords();
      }
    });
  }

  openSaveDialog(): void {

    this.locationService.passLocationToSaveModal.next(this.location);

    const dialogRef = this.dialog.open(SaveLocationComponent, {
      width: '850px',
      data: this.location.id.toString()
    });
    dialogRef.afterClosed().subscribe(result => {
      this.locationService.passLocationToSaveModal.next({
        id: 0,
        longitude: 0,
        latitude: 0,
        city: {
          id: 0,
          name: '',
          state: {
            id: 0,
            name: ''
          }
        }
      });
    });
  }
}
