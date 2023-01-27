import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exoplanet } from './exoplanet/exoplanet'

const headerDict = {
  'Target-URL': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync',
}

const httpOptions = {
  headers: new HttpHeaders(headerDict),
};

const cacheOptions = {
  headers: new HttpHeaders(headerDict),
  cache: true
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // Use the CORS proxy to set CORS headers
  hostUrl = 'https://cors-proxy-phi.vercel.app/proxy?query=';
  defaultQuery = 'select+pl_name,hostname,discoverymethod,disc_year,disc_facility,disc_refname,pl_controv_flag,sy_snum,sy_pnum,sy_mnum,cb_flag,rastr,decstr,st_spectype,ra,dec,pl_orbper,pl_rade,pl_bmasse,sy_dist+from+pscomppars'
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  private FACILITY_DATA_CACHE_KEY = 'facilityDataCache';
  private METHOD_DATA_CACHE_KEY = 'methodDataCache';
  private EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor(private http: HttpClient) {}

  getDiscFacilityData(): Promise<any> {
    let facilityDataCache = localStorage.getItem(this.FACILITY_DATA_CACHE_KEY);
    if (facilityDataCache) {
      let cacheData = JSON.parse(facilityDataCache);
      if (cacheData.expiry > Date.now()) {
        return Promise.resolve(cacheData.data);
      }
    }
    return this.http
      .get<any[]>(this.hostUrl + 'select+distinct+disc_facility+from+pscomppars&format=json', cacheOptions)
      .toPromise()
      .then((data) => {
        let expiry = Date.now() + this.EXPIRY_TIME;
        localStorage.setItem(this.FACILITY_DATA_CACHE_KEY, JSON.stringify({ expiry, data }));
        return data;
      });
  }

  getDiscMethodData(): Promise<any>{
    let methodDataCache = localStorage.getItem(this.METHOD_DATA_CACHE_KEY);
    if (methodDataCache) {
      return Promise.resolve(JSON.parse(methodDataCache));
    }
    return this.http
    .get<any[]>(this.hostUrl + 'select+distinct+discoverymethod+from+pscomppars&format=json', cacheOptions)
    .toPromise()
    .then((data) => {
      localStorage.setItem(this.METHOD_DATA_CACHE_KEY, JSON.stringify(data));
      return data;
    });
  }

  getExoPlanetData(query: string): Promise<any> {
    console.log(this.hostUrl + query);
    return this.http.get<any[]>(this.hostUrl + this.defaultQuery + query + '&format=json', httpOptions).toPromise();
  }
}
