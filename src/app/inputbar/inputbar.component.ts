import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css']
})
export class InputbarComponent implements OnInit {

  hostData: any[] = ["Hostname", ];
  methodData: any[] = ["Discovery Method", ];
  yearData: any[] = ["Discovery Year", ];
  facilityData: any[] = ["Discovery Facility", ];
  
  public selectedHostValue!: string;
  public selectedMethodValue!: string;
  public selectedYearValue!: string;
  public selectedFacilityValue!: string;

  constructor(private papa: Papa, private data: DataService, private http: HttpClient) { }

  // initiate hostname select box
  private _selectedHost!: number;

  public get selectedHost(): number {
    return this._selectedHost;
  }

  public set selectedHost(index: number) {
    this._selectedHost = index;
    this.selectedHostValue = this.hostData[index];
    
    console.log(this.selectedHostValue);

  }

  // initiate discovery method select box
  private _selectedMethod!: number;

  public get selectedMethod(): number {
    return this._selectedMethod;
  }

  public set selectedMethod(index: number) {
    this._selectedMethod = index;
    this.selectedMethodValue = this.methodData[index];
    
    console.log(this.selectedMethodValue);
  }

  // initiate discovery year select box
  private _selectedYear!: number;

  public get selectedYear(): number {
    return this._selectedYear;
  }

  public set selectedYear(index: number) {
    this._selectedYear = index;
    this.selectedYearValue = this.yearData[index];
    
    console.log(this.selectedYearValue);
  }

  // initiate discovery facility select box
  private _selectedFacility!: number;

  public get selectedFacility(): number {
    return this._selectedFacility;
  }

  public set selectedFacility(index: number) {
    this._selectedFacility = index;
    this.selectedFacilityValue = this.facilityData[index];
    
    console.log(this.selectedFacilityValue);
  }

  ngOnInit(): void {
    this.getHostList();
    this.getMethodList();
    this.getYearList();
    this.getFacilityList(); 
    this.selectedHost = 0;
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
  }

  public getHostList() {
    this.http.get('./assets/hostnames.csv', {responseType: 'text'}).subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        this.hostData.push(e);
      })
        
    })
    console.log("test2");
  }

  public getMethodList() {
    console.log("test!!")
    this.http.get('./senior-design/assets/discoverymethod.csv', {responseType: 'text'}).subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        this.methodData.push(e);
        console.log("test!!")
      })
    })
  }

  public getYearList() {
    this.http.get('./assets/disc_year.csv', {responseType: 'text'}).subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        this.yearData.push(e);
        console.log("test!")
      })
    })
  }

  public getFacilityList() {
    this.http.get('./assets/disc_facility.csv', {responseType: 'text'}).subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        this.facilityData.push(e);
        console.log("test!")
      })
    })
  }
}
