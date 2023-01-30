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
  columns = 'pl_name,hostname,discoverymethod,disc_year,disc_facility,disc_refname,pl_controv_flag,sy_snum,sy_pnum,sy_mnum,cb_flag,rastr,decstr,st_spectype,ra,dec,pl_orbper,pl_rade,pl_bmasse,sy_dist,pl_orbsmax,pl_orbeccen,pl_dens';
  defaultQuery = 'select+' + this.columns + '+from+pscomppars'

  // Define cache keys
  private FACILITY_DATA_CACHE_KEY = 'facilityDataCache';
  private METHOD_DATA_CACHE_KEY = 'methodDataCache';
  private YEAR_DATA_CACHE_KEY = 'yearDataCache';
  private EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor(private http: HttpClient) {}

  // Return discovery facility options
  getDiscFacilityData(): Promise<any> {
    let facilityDataCache = localStorage.getItem(this.FACILITY_DATA_CACHE_KEY);
    // Check for cached data
    if (facilityDataCache) {
      let cacheData = JSON.parse(facilityDataCache);
      if (cacheData.expiry > Date.now()) {
        return Promise.resolve(cacheData.data);
      }
    }
    // If expired use exoplanet database
    return this.http
      .get<any[]>(this.hostUrl + 'select+distinct+disc_facility+from+pscomppars&format=json', cacheOptions)
      .toPromise()
      .then((data) => {
        // Store in cache for future use
        let expiry = Date.now() + this.EXPIRY_TIME;
        localStorage.setItem(this.FACILITY_DATA_CACHE_KEY, JSON.stringify({ expiry, data }));
        return data;
      });
  }

  getDiscYearData(): Promise<any> {
    let yearDataCache = localStorage.getItem(this.YEAR_DATA_CACHE_KEY);
    // Check for cached data
    if (yearDataCache) {
      let cacheData = JSON.parse(yearDataCache);
      if (cacheData.expiry > Date.now()) {
        return Promise.resolve(cacheData.data);
      }
    }
    // If expired use exoplanet database
    return this.http
      .get<any[]>(this.hostUrl + 'select+distinct+disc_year+from+pscomppars+order+by+disc_year+desc&format=json', cacheOptions)
      .toPromise()
      .then((data) => {
        // Store in cache for future use
        let expiry = Date.now() + this.EXPIRY_TIME;
        localStorage.setItem(this.YEAR_DATA_CACHE_KEY, JSON.stringify({ expiry, data }));
        return data;
      });
  }

  getDiscMethodData(): Promise<any>{
    let methodDataCache = localStorage.getItem(this.METHOD_DATA_CACHE_KEY);
    // Check for cached data
    if (methodDataCache) {
      let cacheData = JSON.parse(methodDataCache);
      if (cacheData.expiry > Date.now()) {
        return Promise.resolve(cacheData.data);
      }
    }
    // If expired use exoplanet database
    return this.http
    .get<any[]>(this.hostUrl + 'select+distinct+discoverymethod+from+pscomppars&format=json', cacheOptions)
    .toPromise()
    .then((data) => {
      // Store in cache for future use
      let expiry = Date.now() + this.EXPIRY_TIME;
      localStorage.setItem(this.METHOD_DATA_CACHE_KEY, JSON.stringify({ expiry, data }));
      return data;
    });
  }

  // Return exoplanet data after search
  getExoPlanetData(query: string): Promise<any> {
    console.log(this.hostUrl + query);
    return this.http.get<any[]>(this.hostUrl + this.defaultQuery + query + '&format=json', httpOptions).toPromise();
  }

  getTopExoplanetData(): Promise<any> {
    return this.http.get<any[]>(this.hostUrl + 'select+top+200+' + this.columns + '+from+pscomppars&format=json', httpOptions).toPromise();
  }
}
