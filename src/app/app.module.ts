import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {MatSliderModule} from '@angular/material/slider';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormField, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from './table/table.component';
import {MapComponent} from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {ButtonComponent} from './shared/buttons/button/button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmationDialogComponent } from './shared/modals/confirmation-dialog/confirmation-dialog.component';
import { SaveLocationComponent } from './save-location/save-location.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import {NotFoundComponent} from './shared/error/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', component: TableComponent},
  {path: 'map', component: MapComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    MapComponent,
    ButtonComponent,
    ConfirmationDialogComponent,
    SaveLocationComponent,
    SpinnerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsKqLH8TKUMBTjACQBFkqdHDj9FtpCVpk'
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
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    SaveLocationComponent
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
