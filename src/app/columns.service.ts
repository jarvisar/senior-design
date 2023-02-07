import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  private COLUMN_CACHE_KEY = 'columnCache';

  // Define default columns
  public displayedColumns;
  public defaultColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'pl_rade', 'pl_bmasse', 'pl_dens', 'disc_facility'];
  constructor() {
    let facilityDataCache = localStorage.getItem(this.COLUMN_CACHE_KEY);
    // Check for cached data
    if (facilityDataCache) {
      let cacheData = JSON.parse(facilityDataCache);
      if (cacheData.expiry > Date.now()) {
        this.displayedColumns = cacheData.data;
        return;
      }
    }
    this.displayedColumns = this.defaultColumns;
  }
}
