import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../shared/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'city-locator-ui';
  lat = 51.678418;
  lng = 7.809007;
  locationChosen = false;

  lokacija: any;

  constructor(private locationService: LocationService) {
    this.locationService.selectedLocation.subscribe(location => {
      this.lat = +location.latitude;
      this.lng = +location.longitude;
    });
  }

  onChoseLocation(event) {
    console.log(event)
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  ngOnInit(): void {
  }


}
