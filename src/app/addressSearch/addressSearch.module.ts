import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddressSearchComponent} from "./addressSearch.component";
import addressSearchRoutes from "./addressSearch.routes";
import {GeoCodeService} from '../services/geocode.service';
import {NrelService} from '../services/nrel.service';
import { ChartsModule } from 'ng2-charts';
@NgModule({
    imports:[
        CommonModule,
         addressSearchRoutes,
         FormsModule,
         ReactiveFormsModule,
         ChartsModule
         ],
    declarations: [AddressSearchComponent],
    providers:[NrelService,GeoCodeService]
})
export default class AddressSearchModule{}