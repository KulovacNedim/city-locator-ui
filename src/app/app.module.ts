import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatSliderModule } from '@angular/material/slider';

import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormField, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import { TableComponent } from './table/table.component';
import { MapComponent } from './table/map/map.component';


const appRoutes: Routes = [
  { path: '', component: TableComponent},
  { path: 'w', component: MapComponent },

];

@NgModule({
  declarations: [
    AppComponent, TableComponent, MapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYXalwwt0jLpTSN5BHKG4vixfneOgKDY4'
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatInputModule, MatFormFieldModule, RouterModule.forRoot(appRoutes)
  ],
  exports: [
    MatFormField,
    MatInputModule, MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
