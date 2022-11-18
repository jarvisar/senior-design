import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Exoplanet } from './exoplanet/exoplanet'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  hostUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query='
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  constructor(private http: HttpClient) {}
  
  getHostList(){
    return this.http.get(this.hostUrl + 'select+distinct+hostname+from+pscomppars+order+by+hostname&format=csv', {responseType: 'text'});
  }

  getExoPlanetData(query: string){
    var testArray: Array<Exoplanet> = [];
    console.log(query);
    this.http.get<any[]>(this.hostUrl + query + '&format=json').subscribe((response: any[]) => {
      response.forEach((e: Exoplanet) => {
        
        testArray.push(e);
        
      })
    });
    
    this.exoplanetData = testArray;
    console.log(this.exoplanetData);
    return this.exoplanetData;
  }

}
