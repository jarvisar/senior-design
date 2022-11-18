import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Exoplanet } from './exoplanet/exoplanet'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  hostUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query='
  
  constructor(private http: HttpClient) {}
  
  getHostList(){
    return this.http.get(this.hostUrl + 'select+distinct+hostname+from+pscomppars+order+by+hostname&format=csv', {responseType: 'text'});
  }

  getExoPlanetData(query: string){
    return this.http.get<any[]>(this.hostUrl + query + '&format=json');
  }
}
