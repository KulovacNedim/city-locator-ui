import { Component, OnInit } from '@angular/core';

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

  onChoseLocation(event) {
    console.log(event)
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  ngOnInit(): void {
  }


}
