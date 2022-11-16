import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css']
})
export class InputbarComponent implements OnInit {

  hostData: any[] = [];
  methodData: any[] = ["Discovery Method", ];
  yearData: any[] = ["Discovery Year", ];
  facilityData: any[] = ["Discovery Facility", ];
  
  public selectedHostValue!: string;
  public selectedMethodValue!: string;
  public selectedYearValue!: string;
  public selectedFacilityValue!: string;
  public apiQuery!: string;

  constructor(private data: DataService, private http: HttpClient) { }

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

  searchclick(event: Event) {
    this.buildQuery();
  }

  ngOnInit(): void {
    this.hostData = this.csvToArray('./assets/hostnames.csv', 'Hostnames');
    this.methodData = this.csvToArray('./assets/discoverymethod.csv', 'Discovery Method')
    this.yearData = this.csvToArray('./assets/disc_year.csv', 'Discovery Year')
    this.facilityData = this.csvToArray('./assets/disc_facility.csv', 'Discovery Facility')

    this.selectedHost = 0;
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
  }

  csvToArray(filePath: string, firstElement: string){
    var list: any[]=[firstElement];
    this.http.get(filePath, {responseType: 'text'}).subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        list.push(e);
      })
        
    })
    return list;
  }

  public buildQuery(){
    var firstConditional: boolean = true;
    this.apiQuery = 'select+*+from+pscomppars';
    (this.selectedHostValue != "Hostname" ? (this.apiQuery += '+where+hostname+=+\'' + this.selectedHostValue + '\'', firstConditional = false) : this.apiQuery = this.apiQuery);
    (this.selectedMethodValue != "Discovery Method" ? (firstConditional == true ? (this.apiQuery += '+where+discoverymethod+=+\'', firstConditional = false) : this.apiQuery += '+and+discoverymethod+=+\'') : this.apiQuery = this.apiQuery);
    (this.selectedYearValue != "Hostname" ? (firstConditional == true ? (this.apiQuery += '+where+disc_year+=+\'', firstConditional = false) : this.apiQuery += '+and+disc_year+=+\'') : this.apiQuery = this.apiQuery);
    (this.selectedFacilityValue != "Hostname" ? (firstConditional == true ? this.apiQuery += '+where+disc_facility+=+\'' : this.apiQuery += '+and+disc_facility+=+\'') : this.apiQuery = this.apiQuery);
    console.log(this.apiQuery);
  }
}
