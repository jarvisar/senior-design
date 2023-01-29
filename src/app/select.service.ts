import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  hostData: any[] = [];
  methodData: any[] = ["Discovery Method", ];
  yearData: any[] = ["Discovery Year", ];
  facilityData: any[] = ["Discovery Facility", ];

  constructor(private http: HttpClient, private data: DataService) { }

  async getHostData() {
    this.hostData = await this.csvToArray('./assets/hostnames.csv', 'Host Names');
    return this.hostData;
  }

  async getMethodData() {
    let response = await this.data.getDiscMethodData();
    if(response != undefined){
      response.forEach((e: any) => {
        this.methodData.push(e.discoverymethod)
      });
    }
    return this.methodData;
  }

  async getYearData() {
    let response = await this.data.getDiscYearData();
    response.forEach((e: any) => {
      this.yearData.push(e.disc_year)
    });
    return this.yearData;
  }

  async getFacilityData() {
    let response = await this.data.getDiscFacilityData();
    response.forEach((e: any) => {
      this.facilityData.push(e.disc_facility)
    });
    return this.facilityData;
  }
  
  async csvToArray(filePath: string, firstElement: string){
    var list: any[]=[firstElement];
    return this.http.get(filePath, {responseType: 'text', params: {encoding: 'utf-8'}}).toPromise().then(data => {
        data?.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        list.push(e);
        });
        return list;
    });
  }


}
