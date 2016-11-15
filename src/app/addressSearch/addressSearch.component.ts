import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { NrelService } from '../services/nrel.service';
import { GeoCodeService } from '../services/geocode.service'
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Subject'

@Component({
  selector: 'addressSearch',
  templateUrl: './addressSearch.component.html',
  styleUrls: ['./addressSearch.component.css']

})

export class AddressSearchComponent implements OnInit, AfterViewInit {
  submitted: boolean;
  myForm: FormGroup;
  location$;
  result$;
  price;


  
  // nameCheck: AbstractControl;

  constructor(private fb: FormBuilder, private nrel: NrelService, private geo: GeoCodeService) {
  }

  ngOnInit() {
    this.submitted = false;
    this.myForm = this.fb.group({
      'address': ['', Validators.required]
      ,
      'city': ['', Validators.required]
      ,
      'state': ['', Validators.required]
      ,
      'zip': ['', Validators.required]
      ,
      'monthlyBill': ['', Validators.required]
      ,
      'electricityUsage': ['', Validators.required]
      ,
      'systemSize': ['', Validators.required]
    });
  }
  updateChart(datas:Array<Number>){
   this.lineChartData = [{data: datas, label: "Potential Savings Each Month (Dollar)" }];
  }
  resetForm() {
    this.submitted = false;
  }
  ngAfterViewInit() {
    console.log(this.myForm);
  }
  parseData(result:any){
    let data : Array<Number> = []; 
   for(var i in result){
     data.push(result[i]*this.price);
   }
    this.updateChart(data);
  }

 
  onSubmit(form: FormGroup): void {
    // console.log(this.myForm.get('dob'));
    // var trimed = this.name.trim();
    //   console.log(trimed);
    this.submitted = true;
    this.price = form.value.monthlyBill/form.value.electricityUsage;
    let param = form.value.address+',+'+form.value.city+',+'+form.value.state;
    this.location$ = this.geo.makeLatLngRequest(param).map((res:Response)=> res.json().results[0].geometry.location);
    this.location$.subscribe(result=> this.result$ = this.nrel.makePvRequest(Number(result.lat),Number(result.lng),form.value.systemSize)
    .subscribe((res:Response) => this.parseData(res.json().outputs.dc_monthly)));
    
   
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

