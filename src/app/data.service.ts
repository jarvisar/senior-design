import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exoplanet } from './exoplanet/exoplanet'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Credentials': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})



export class DataService {
  hostUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query='
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  
  constructor(private http: HttpClient) {}
  
  getHostList(){
    return this.http.get(this.hostUrl + 'select+distinct+hostname+from+pscomppars+order+by+hostname&format=csv', httpOptions);
  }

  getExoPlanetData(query: string){
    var testArray: Array<Exoplanet> = [];
    console.log(query);
    //return this.http.get<any[]>(this.hostUrl + query + '&format=json');
    return this.http.get<any[]>(this.hostUrl + query + '&format=json');
  }

}
