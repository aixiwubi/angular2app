import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export  class GeoCodeService {
  latlng = 'https://nrelapi.herokuapp.com/geo?'
  address = 'https://nrelapi.herokuapp.com/address?'
  constructor(private http : Http) { 
    console.log('geocode service constructed');
  }
  makeAddressRequest(searchLat: number, searchLng: number){
    console.log('in geocode service making request'+ 'lat =' + searchLat + 'lon =' + searchLng);
    
    return this.http.get(this.latlng+'lat='+searchLat+'&'+'lon='+searchLng);

  }
  makeLatLngRequest(address: string){
    console.log('in geocode service making request '+ 'address = '+ address);
    return  this.http.get(this.address+'address='+ address);
  }
}
