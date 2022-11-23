import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { HelpboxComponent } from '../helpbox/helpbox.component';
import { ExoplanetComponent } from '../exoplanet/exoplanet.component';


@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css']
})
export class InputbarComponent implements OnInit {
  
  public exoplanetData: Array<any> = [];
  public numResults: number = 0;
  public showTable: boolean = false;
  
  hostData: any[] = [];
  methodData: any[] = ["Discovery Method", ];
  yearData: any[] = ["Discovery Year", ];
  facilityData: any[] = ["Discovery Facility", ];
  
  public selectedHostValue!: string;
  public selectedMethodValue!: string;
  public selectedYearValue!: string;
  public selectedFacilityValue!: string;
  public apiQuery!: string;

  constructor(public helpbox: HelpboxComponent, private data: DataService, private http: HttpClient, public exoplanet: ExoplanetComponent) { }

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
    //if all four select boxes are set to , buildQuery() returns true
    
    this.showTable = true;
    var emptySearch: boolean = this.buildQuery();
    
    this.exoplanetData = this.exoplanet.getExoplanetData(this.apiQuery);
    console.log(this.exoplanetData);
    console.log(this.exoplanetData.length);
    this.numResults = this.exoplanetData.length;
  }

  clearclick(event: Event) {
    this.showTable = false;
    this.selectedHost = 0;
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
    this.exoplanetData = [];
  }

  ngOnInit(): void {
    //
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
    this.apiQuery = 'select+pl_name,hostname,discoverymethod,disc_year,disc_facility+from+pscomppars';
    //first check if select box has valid value then check if any other conditional has been applied 
    (this.selectedHostValue != "Hostnames" ? (this.apiQuery += '+where+hostname+=+\'' + this.selectedHostValue + '\'', firstConditional = false) : this.apiQuery = this.apiQuery);
    (this.selectedMethodValue != "Discovery Method" ? (firstConditional == true ? (this.apiQuery += '+where+discoverymethod+=+\'' + this.selectedMethodValue + '\'', firstConditional = false) : this.apiQuery += '+and+discoverymethod+=+\'' + this.selectedMethodValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedYearValue != "Discovery Year" ? (firstConditional == true ? (this.apiQuery += '+where+disc_year+=+\'' + this.selectedYearValue + '\'', firstConditional = false) : this.apiQuery += '+and+disc_year+=+\'' + this.selectedYearValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedFacilityValue != "Discovery Facility" ? (firstConditional == true ? (this.apiQuery += '+where+disc_facility+=+\''  + this.selectedFacilityValue + '\'', firstConditional = false): this.apiQuery += '+and+disc_facility+=+\''  + this.selectedFacilityValue + '\'') : this.apiQuery = this.apiQuery);
    //returns true if input is empty
    return firstConditional;
  }
  
}
