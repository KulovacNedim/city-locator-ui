import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {MatSliderModule} from '@angular/material/slider';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormField, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from './table/table.component';
import {MapComponent} from './table/map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {ButtonComponent} from './shared/buttons/button/button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { ConfirmationDialogComponent } from './shared/modals/confirmation-dialog/confirmation-dialog.component';


const appRoutes: Routes = [
  {path: '', component: TableComponent},
  {path: 'map', component: MapComponent},

];

@NgModule({
  declarations: [
    AppComponent, TableComponent, MapComponent, ButtonComponent, ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYXalwwt0jLpTSN5BHKG4vixfneOgKDY4'
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  exports: [
    MatFormField,
    MatInputModule, MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
