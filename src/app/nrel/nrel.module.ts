import {CommonModule} from "@angular/common";
import { NgModule } from '@angular/core';
import {NrelService} from '../services/nrel.service';
import {NrelComponent} from './nrel.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChartsModule } from 'ng2-charts';
import {GeoCodeService} from '../services/geocode.service';
import nrelRoutes from './nrel.router';
@NgModule({
  declarations: [
    NrelComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlMxZkhGtybgfrDsXJVgi0NxUHE4ssyTI'
    }),
    nrelRoutes
  ],
  providers: [NrelService,GeoCodeService],

})
export default class NrelModule { }
