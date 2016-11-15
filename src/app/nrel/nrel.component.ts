import { Component } from '@angular/core';
import {Http,Response} from '@angular/http';
import {NrelService} from '../services/nrel.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ChartsModule } from 'ng2-charts';
import {GeoCodeService} from '../services/geocode.service';


@Component({
  selector: 'Nrel',
  templateUrl: './nrel.component.html',
  styles: [`.sebm-google-map-container {
  height: 300px;
  width: 550px;
  display: inline-block;
  text-align: center;

}`
 ],

})
export class NrelComponent {
 // loading: boolean;
  lat: number = 41.8781;
  lng: number = -87.6298;
  searchLat: number;
  searchLng: number;
  address$;
  constructor(private nrel: NrelService, private geo:GeoCodeService){}

 
  mapClicked($event){
     this.searchLat = $event.coords.lat;
     this.searchLng = $event.coords.lng;
     this.makeRequest(this.searchLat,this.searchLng);
  }
  updateChart(datas:Array<Number>){
   this.lineChartData = [{data: datas, label: "Average Direct Normal Irradiance " }];
  }
  parseData(result:any){
    let data : Array<Number> = []; 
    data.push(result.jan);
    data.push(result.feb);
    data.push(result.mar);
    data.push(result.apr);
    data.push(result.may);
    data.push(result.jun);
    data.push(result.jul);
    data.push(result.aug);
    data.push(result.sep);
    data.push(result.oct);
    data.push(result.nov);
    data.push(result.dec);
    this.updateChart(data);
  }
  makeRequest(searchLat:number, searchLng: number){

    console.log('making request');
    this.nrel.makeRequest(searchLat,searchLng)
    .subscribe((res:Response) =>  this.parseData(res.json().outputs.avg_dni.monthly));
    this.address$ = this.geo.makeAddressRequest(searchLat,searchLng).map((res:Response) => res.json().results[0].formatted_address);
   
}

  public lineChartData:Array<any> = [
    {data: [], label:"Average Direct Normal Irradiance "}
  ];
  public lineChartLabels:Array<any> = 
  ['January', 'February', 'March', 'April', 'May', 'June', 'July','August',
  'September','October','November','December'];
  public lineChartOptions:any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  

}
