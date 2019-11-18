import {Component, Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../shared/modals/confirmation-dialog/confirmation-dialog.component';
import {LocationService} from '../shared/services/location-service/location.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location.component.html',
  styleUrls: ['./save-location.component.css']
})
export class SaveLocationComponent {

  location = {
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
  };
  formValid = false;
  updated = false;
  matcher = new MyErrorStateMatcher();

  mapMarker: {
    markerLat: number,
    markerLng: number
  };

  constructor(private locationService: LocationService,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<SaveLocationComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) {
    locationService.passLocationToSaveModal.subscribe(resLocation => {
      if (resLocation) {
        this.location = resLocation;
        this.mapMarker = {
          markerLat: +resLocation.latitude,
          markerLng: +resLocation.longitude
        };
      }
      if (this.location.id === 0) {
        this.mapMarker = {
          markerLat: 52.520008,
          markerLng: 13.404954
        };
      }
    });
  }

  cityFormControl = new FormControl('', [
    Validators.required
  ]);

  stateFormControl = new FormControl('', [
    Validators.required
  ]);

  latitudeFormControl = new FormControl('', [
    Validators.required
  ]);

  longitudeFormControl = new FormControl('', [
    Validators.required
  ]);

  checkFormValidity = () => {
    this.formValid =
      this.cityFormControl.status === 'VALID' &&
      this.stateFormControl.status === 'VALID' &&
      this.latitudeFormControl.status === 'VALID' &&
      this.longitudeFormControl.status === 'VALID' &&
      this.location.latitude !== 0 &&
      this.location.longitude !== 0;
  }

  populateCoords($event: any) {
    this.location.latitude = +$event.coords.lat;
    this.location.longitude = +$event.coords.lng;
    this.mapMarker.markerLat = $event.coords.lat;
    this.mapMarker.markerLng = $event.coords.lng;
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.location.id === 0 ? 'Do you confirm the creation of this Location?' : 'Do you confirm update for this Location?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.message === '0') {
          this.locationService.saveLocation(this.location).subscribe();
        } else {
          this.locationService.submitLocation(this.location).subscribe();
        }
        this.finalizeModal();
      }
    });
  }

  finalizeModal = () => {
    this.updated = true;
    setTimeout(() => {
      this.dialogRef.close();
    }, 1.5 * 1000);
  }
}
