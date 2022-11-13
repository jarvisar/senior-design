import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  hostUrl = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+distinct+hostname+from+pscomppars+order+by+hostname&format=csv'
  constructor(private http: HttpClient) {}
  getHostList(){
    return this.http.get(this.hostUrl, {responseType: 'text'});
  }
}
