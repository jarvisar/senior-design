import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { HelpboxComponent } from '../helpbox/helpbox.component';
import { ExoplanetComponent } from '../exoplanet/exoplanet.component';
import { DownloadService } from '../download.service';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { Exoplanet } from '../exoplanet/exoplanet';
import { LoadingService } from '../loading.service'
import { SelectService } from '../select.service';
import { Observable } from 'rxjs';

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
    ])
  ]
})
export class InputbarComponent implements OnInit {
  @ViewChild('hostSelect') select: HTMLSelectElement;
  selected$: Observable<boolean>;

  public exoplanetData: Array<any> = [];
  public numResults: number = 0;
  public showTable: boolean = false;
  public firstSearch : boolean = true;
  
  // Initialize data to prevent undefined errors
  hostData: any[] = [];
  methodData: any[] = [];
  yearData: any[] = [];
  facilityData: any[] = [];
  selected = false;
  
  public selectedHostValue!: string;
  public selectedMethodValue!: string;
  public selectedYearValue!: string;
  public selectedFacilityValue!: string;
  public apiQuery!: string;

  constructor(public helpbox: HelpboxComponent, private data: DataService, private http: HttpClient, public exoplanet: ExoplanetComponent, private downloadService: DownloadService, 
    public loadingService: LoadingService, public selectService: SelectService, private cd: ChangeDetectorRef) {
      this.selected$ = new Observable((observer) => {
        observer.next(this.selected);
      });
  }

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
  }

  // initiate discovery year select box
  private _selectedYear!: number;

  public get selectedYear(): number {
    return this._selectedYear;
  }

  public set selectedYear(index: number) {
    this._selectedYear = index;
    this.selectedYearValue = this.yearData[index];
  }

  // initiate discovery facility select box
  private _selectedFacility!: number;

  public get selectedFacility(): number {
    return this._selectedFacility;
  }

  public set selectedFacility(index: number) {
    this._selectedFacility = index;
    this.selectedFacilityValue = this.facilityData[index];
  }

  async searchclick(event: Event) {
    //if all four select boxes are set to , buildQuery() returns true
    let emptySearch: boolean = this.buildQuery();
    this.firstSearch = false;
    let newArray: Array<Exoplanet> = [];
    let response = await this.data.getExoPlanetData(this.apiQuery);
    response.forEach((e: Exoplanet) => {
      //Add each exoplanet to array
      newArray.push(e)
    });
    this.exoplanetData = newArray;
    console.log(this.exoplanetData);
    this.numResults = this.exoplanetData.length;
    this.showTable = true;
  }

  clearSelect() {
    this.selectedHost = 0;
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
  }

  clearclick(event: Event) {
    this.showTable = false;
    this.clearSelect();
    this.exoplanetData = [];
    this.firstSearch = true;
  }

  // Only load hostnames if user clicks on select box
  async loadOptions(){
    this.hostData = await this.selectService.getHostData();
    this.selected = true;
    setTimeout(() => {
      this.select.size = 20;
      this.cd.detectChanges();
    });
  }

  doNothing(){}
  
  // Load option data for other 3 select boxes
  async ngOnInit() {
    const methodPromise = this.selectService.getMethodData();
    const yearPromise = this.selectService.getYearData();
    const facilityPromise = this.selectService.getFacilityData();

    const [ methodData, yearData, facilityData] = await Promise.all([ methodPromise, yearPromise, facilityPromise]);
    this.hostData = ["Host Names"];
    this.methodData = methodData;
    this.yearData = yearData;
    this.facilityData = facilityData;
    this.clearSelect();
  }

  public buildQuery(){
    let firstConditional: boolean = true;
    this.apiQuery = '';
    // First check if select box has valid value then check if any other conditional has been applied 
    (this.selectedHostValue != "Host Names" ? (this.apiQuery += '+where+hostname+=+\'' + this.selectedHostValue + '\'', firstConditional = false) : this.apiQuery = this.apiQuery);
    (this.selectedMethodValue != "Discovery Method" ? (firstConditional == true ? (this.apiQuery += '+where+discoverymethod+=+\'' + this.selectedMethodValue + '\'', firstConditional = false) : this.apiQuery += '+and+discoverymethod+=+\'' + this.selectedMethodValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedYearValue != "Discovery Year" ? (firstConditional == true ? (this.apiQuery += '+where+disc_year+=+\'' + this.selectedYearValue + '\'', firstConditional = false) : this.apiQuery += '+and+disc_year+=+\'' + this.selectedYearValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedFacilityValue != "Discovery Facility" ? (firstConditional == true ? (this.apiQuery += '+where+disc_facility+=+\''  + this.selectedFacilityValue + '\'', firstConditional = false): this.apiQuery += '+and+disc_facility+=+\''  + this.selectedFacilityValue + '\'') : this.apiQuery = this.apiQuery);
    // Returns true if input is empty
    return firstConditional;
  }

  download(){
    this.downloadService.downloadFile(this.exoplanetData, 'exoplanet_data');
  }
}
