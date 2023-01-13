import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { HelpboxComponent } from '../helpbox/helpbox.component';
import { ExoplanetComponent } from '../exoplanet/exoplanet.component';
import { DownloadService } from '../download.service';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

export const fadeInOut = (name = 'fadeInOut', duration = 5.5) =>
  trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.2s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate('.2s ease-in', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css'],
  animations: [
    fadeInOut('fadeinandout', 0.1),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class InputbarComponent implements OnInit {
  
  selected = 'option2';
  public exoplanetData: Array<any> = [];
  public numResults: number = 0;
  public showTable: boolean = false;
  public firstSearch : boolean = true;
  
  hostData: any[] = [];
  methodData: any[] = ["Discovery Method", ];
  yearData: any[] = ["Discovery Year", ];
  facilityData: any[] = ["Discovery Facility", ];
  
  public selectedHostValue!: string;
  public selectedMethodValue!: string;
  public selectedYearValue!: string;
  public selectedFacilityValue!: string;
  public apiQuery!: string;

  constructor(public helpbox: HelpboxComponent, private data: DataService, private http: HttpClient, public exoplanet: ExoplanetComponent, private downloadService: DownloadService) { }

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
    var emptySearch: boolean = this.buildQuery();
    
    this.exoplanetData = this.exoplanet.getExoplanetData(this.apiQuery);
    console.log(this.exoplanetData);
    console.log(Object.keys(this.exoplanetData).length);
    this.numResults = this.exoplanetData.length;
    this.showTable = true;
    this.firstSearch = false;
  }

  clearclick(event: Event) {
    this.showTable = false;
    this.selectedHost = 0;
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
    this.exoplanetData = [];
    this.firstSearch = true;
  }

  ngOnInit(): void {
    // Load select boxes' options
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

  download(){
    this.downloadService.downloadFile(this.exoplanetData, 'exoplanet_data');
  }
  
}
