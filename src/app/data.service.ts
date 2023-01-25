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
  hostUrl = 'https://cors-proxy-phi.vercel.app/proxy?query=';
  defaultQuery = 'select+pl_name,hostname,discoverymethod,disc_year,disc_facility,disc_refname,pl_controv_flag,sy_snum,sy_pnum,sy_mnum,cb_flag,rastr,decstr,st_spectype,ra,dec+from+pscomppars'
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  constructor(private http: HttpClient) {}

  getDiscFacilityData(): Promise<any>{
    return this.http.get<any[]>(this.hostUrl + 'select+distinct+disc_facility+from+pscomppars&format=json', httpOptions).toPromise();
  }

  getDiscMethodData(): Promise<any>{
    return this.http.get<any[]>(this.hostUrl + 'select+distinct+discoverymethod+from+pscomppars&format=json', httpOptions).toPromise();
  }

  getExoPlanetData(query: string): Promise<any> {
    console.log(this.hostUrl + query);
    return this.http.get<any[]>(this.hostUrl + this.defaultQuery + query + '&format=json', httpOptions).toPromise();
  }
}
