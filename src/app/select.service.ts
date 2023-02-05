import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  hostData: any[] = [];
  methodData: any[] = [];
  yearData: any[] = [];
  facilityData: any[] = [];

  constructor(private http: HttpClient, private data: DataService) { }

  // Load host name input options from CSV
  async getHostData() {
    this.hostData = await this.csvToArray('./assets/hostnames.csv', 'Host Names');
    return this.hostData;
  }

  // Load discovery method input options
  async getMethodData() {
    let response = await this.data.getDiscMethodData();
    if(response != undefined){
      response.forEach((e: any) => {
        this.methodData.push(e.discoverymethod)
      });
    }
    return this.methodData;
  }

  // Load discovery year input options
  async getYearData() {
    let response = await this.data.getDiscYearData();
    response.forEach((e: any) => {
      this.yearData.push(e.disc_year)
    });
    return this.yearData;
  }

  // Load discovery facility input options
  async getFacilityData() {
    let response = await this.data.getDiscFacilityData();
    response.forEach((e: any) => {
      this.facilityData.push(e.disc_facility)
    });
    return this.facilityData;
  }
  
  // Converts CSV file to array
  async csvToArray(filePath: string, firstElement: string){
    var list: any[]=[];
    return this.http.get(filePath, {responseType: 'text', params: {encoding: 'utf-8'}}).toPromise().then(data => {
      data?.split('\n').forEach(e => {
      e = e.replace(/['"]+/g, '');
      list.push(e);
      });
      return list;
    });
  }
}
