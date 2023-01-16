import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exoplanet } from './exoplanet/exoplanet'

const headerDict = {
  'Target-URL': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync',
}

const httpOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // Use the CORS proxy to set CORS headers
  hostUrl = 'https://cors-proxy-phi.vercel.app/proxy?query='
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  constructor(private http: HttpClient) {}

  getExoPlanetData(query: string){
    console.log(this.hostUrl);
    var testArray: Array<Exoplanet> = [];
    console.log(query);
    //return this.http.get<any[]>(this.hostUrl + query + '&format=json');
    return this.http.get<any[]>(this.hostUrl + query + '&format=json', httpOptions);
  }
}
