import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Set target URL for CORS proxy
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
  // Columns to pull from database
  columns = 'pl_name,hostname,discoverymethod,disc_year,disc_facility,disc_refname,pl_controv_flag,sy_snum,sy_pnum,sy_mnum,cb_flag,rastr,decstr,st_spectype,ra,dec,pl_orbper,pl_rade,pl_bmasse,sy_dist,pl_orbsmax,pl_orbeccen,pl_dens,pl_radj,pl_bmassj,pl_eqt,st_teff,st_rad,st_mass';
  defaultQuery = 'select+' + this.columns + '+from+pscomppars'

  // Define cache keys
  private FACILITY_DATA_CACHE_KEY = 'facilityDataCache';
  private METHOD_DATA_CACHE_KEY = 'methodDataCache';
  private YEAR_DATA_CACHE_KEY = 'yearDataCache';
  private EXOPLANET_DATA_CACHE_KEY = 'exoplanetDataCache';
  private EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  private EXPIRY_TIME3 = 3 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  constructor(private http: HttpClient) {}

  // Return discovery facility options
  getDiscFacilityData(): Promise<any> {    // Get options for discovery facility input
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

  getDiscYearData(): Promise<any> {    // Get options for discovery year input
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

  getDiscMethodData(): Promise<any>{    // Get options for discovery method input
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

  isEmpty(value){
    return (value == null || value.length === 0);
  }

  // Fetch exoplanet data to be used in table
  getExoPlanetData(query: string, querySet): Promise<any> {
    console.log(this.hostUrl + this.defaultQuery + query + '&format=json');
    console.log('sending request')
    let exoplanetDataCache = localStorage.getItem(this.EXOPLANET_DATA_CACHE_KEY);
    // Check for cached data
    if (exoplanetDataCache) {
      let cacheData = JSON.parse(exoplanetDataCache);
      if (cacheData.expiry > Date.now()) {
        // If using cached data, use querySet to filter data
        let filteredData = cacheData.data;
        if (querySet.selectedHost !== '') {
          filteredData = filteredData.filter(d => d.hostname === querySet.selectedHost);
        }
        if (querySet.selectedMethod !== '') {
          filteredData = filteredData.filter(d => d.discoverymethod === querySet.selectedMethod);
        }
        if (querySet.selectedYear !== '') {
          filteredData = filteredData.filter(d => d.disc_year == querySet.selectedYear);
        }
        if (querySet.selectedFacility !== '') {
          filteredData = filteredData.filter(d => d.disc_facility === querySet.selectedFacility);
        }
        if (querySet.selectedMinMass !== undefined && this.isEmpty(querySet.selectedMinMass) == false) {
          filteredData = filteredData.filter(d => d.pl_bmasse >= querySet.selectedMinMass);
        }
        if (querySet.selectedMaxMass !== undefined && this.isEmpty(querySet.selectedMaxMass) == false) {
          filteredData = filteredData.filter(d => d.pl_bmasse <= querySet.selectedMaxMass);
        }
        if (querySet.selectedMinRadius !== undefined && this.isEmpty(querySet.selectedMinRadius) == false) {
          filteredData = filteredData.filter(d => d.pl_rade >= querySet.selectedMinRadius);
        }
        if (querySet.selectedMaxRadius !== undefined && this.isEmpty(querySet.selectedMaxRadius) == false) {
          filteredData = filteredData.filter(d => d.pl_rade <= querySet.selectedMaxRadius);
        }
        if (querySet.selectedMinDensity !== undefined && this.isEmpty(querySet.selectedMinDensity) == false) {
          filteredData = filteredData.filter(d => d.pl_dens >= querySet.selectedMinDensity);
        }
        if (querySet.selectedMaxDensity !== undefined && this.isEmpty(querySet.selectedMaxDensity) == false) {
          filteredData = filteredData.filter(d => d.pl_dens <= querySet.selectedMaxDensity);
        }
        if (querySet.selectedStarType !== 'Star Type') {
          filteredData = filteredData.filter(d => d.st_spectype && d.st_spectype[0] == querySet.selectedStarType);
        }
        if (querySet.selectedStarNum !== '# of Stars in System') {
          filteredData = filteredData.filter(d => d.sy_snum == querySet.selectedStarNum);
        }
        if (querySet.selectedPlanetNum !== '# of Planets in System') {
          filteredData = filteredData.filter(d => d.sy_pnum == querySet.selectedPlanetNum);
        }
        if (querySet.showControversial === true) {
          filteredData = filteredData.filter(d => d.pl_controv_flag === 1);
        }
        if (querySet.westCornerRa !== undefined && querySet.eastCornerRa !== undefined && querySet.southCornerDec !== undefined && querySet.northCornerDec !== undefined && this.isEmpty(querySet.westCornerRa) == false && this.isEmpty(querySet.eastCornerRa) == false && this.isEmpty(querySet.southCornerDec) == false && this.isEmpty(querySet.northCornerDec) == false) {
          filteredData = filteredData.filter(d => {
            return d.ra >= querySet.westCornerRa && d.ra <= querySet.eastCornerRa && d.dec >= querySet.southCornerDec && d.dec <= querySet.northCornerDec;
          });
        }
        return Promise.resolve(filteredData);
      }
    }
    // If no cache found or cache is expired, use query API string to fetch data from Exoplanet Archive
    return this.http
      .get<any[]>(this.hostUrl + this.defaultQuery + query + '&format=json', cacheOptions)
      .toPromise();
  }

  // Cache all exoplanet data in background
  getAllExoplanetData() {
    let exoplanetDataCache = localStorage.getItem(this.EXOPLANET_DATA_CACHE_KEY);
    if (exoplanetDataCache) {     // Check for cached data
      let cacheData = JSON.parse(exoplanetDataCache);
      if (cacheData.expiry > Date.now()) {
        return;
      }
    }
    return this.http      // If expired call exoplanet database
    .get<any[]>(this.hostUrl + "+" + this.defaultQuery + '&format=json', cacheOptions)
    .toPromise()
    .then((data) => {
      let expiry = Date.now() + this.EXPIRY_TIME3;        // Store in cache for a max of three days before expiring
      localStorage.setItem(this.EXOPLANET_DATA_CACHE_KEY, JSON.stringify({ expiry, data }));
      return data;
    })
    .catch(error => { // If error, try again once
      console.error(error);
      return this.http
      .get<any[]>(this.hostUrl + "+" + this.defaultQuery + '&format=json', cacheOptions)
      .toPromise()
      .then((data) => {
        let expiry = Date.now() + this.EXPIRY_TIME3;          // Store in cache for a max of three days before expiring
        localStorage.setItem(this.EXOPLANET_DATA_CACHE_KEY, JSON.stringify({ expiry, data }));
        return;
      });
    });
  }

  // Get top 200 exoplanets
  getTopExoplanetData(): Promise<any> {
    return this.http.get<any[]>(this.hostUrl + 'select+top+200+' + this.columns + '+from+pscomppars&format=json', httpOptions).toPromise();
  }
}