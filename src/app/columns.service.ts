import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  // Define default columns
  public displayedColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'pl_rade', 'pl_bmasse', 'pl_dens', 'disc_facility'];
  constructor() { }
}
