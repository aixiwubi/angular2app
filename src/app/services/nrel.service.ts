import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class NrelService {
  Url = 'https://nrelapi.herokuapp.com/nrel?'
  pv = 'https://nrelapi.herokuapp.com/pv5?'
  constructor(private http : Http) { 
    console.log('nrel service constructed');
  }
  makeRequest(searchLat: number, searchLng: number){
    console.log('in nrel service making request'+ 'lat =' + searchLat + 'lon =' + searchLng);
    
    return this.http.get(this.Url+'lat='+searchLat+'&'+'lon='+searchLng);
    
    
  }
  makePvRequest(searchLat: number, searchLng: number,size:number){
    console.log("in nrel service making pv watts request")
    return this.http.get(this.pv+'lat='+searchLat+'&'+'lon='+searchLng+'&size=' +size);
  }

}
