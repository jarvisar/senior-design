import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exoplanet } from './exoplanet/exoplanet'

const httpOptions = {
  headers: new HttpHeaders({ 
    //can put HTTP headers here
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
  //As of right now API uses CORS.SH proxy to prevent CORS errors when returning data
  //Currently investigating better solutions such as running a NODE JS proxy server myself
  //hostUrl = 'https://proxy.cors.sh/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query='
  hostUrl = '/TAP/sync?query='
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  constructor(private http: HttpClient) {}
  
  getHostList(){
    return this.http.get(this.hostUrl + 'select+distinct+hostname+from+pscomppars+order+by+hostname&format=csv', httpOptions);
  }

  getExoPlanetData(query: string){
    console.log(this.hostUrl);
    var testArray: Array<Exoplanet> = [];
    console.log(query);
    //return this.http.get<any[]>(this.hostUrl + query + '&format=json');
    return this.http.get<any[]>(this.hostUrl + query + '&format=json');
  }

}
