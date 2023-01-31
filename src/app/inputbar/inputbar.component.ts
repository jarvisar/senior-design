import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { HelpboxComponent } from '../helpbox/helpbox.component';
import { ExoplanetComponent } from '../exoplanet/exoplanet.component';
import { DownloadService } from '../download.service';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { Clipboard } from '@angular/cdk/clipboard';
import { Exoplanet } from '../exoplanet/exoplanet';
import { LoadingService } from '../loading.service'
import { SelectService } from '../select.service';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

export const fadeInOut = (name = 'fadeInOut', duration = 3) =>
  trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.1s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate('.1s ease-in', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    fadeInOut('fadeinandout', 0.1),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class InputbarComponent implements OnInit, AfterViewInit {
  @ViewChild('hostSelect') select: HTMLSelectElement;
  selected$: Observable<boolean>;

  showNewSearch = false;

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
    public loadingService: LoadingService, public selectService: SelectService, private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private clipboard: Clipboard) {
      this.selected$ = new Observable((observer) => {
        observer.next(this.selected);
      });
  }

  // initiate hostname select box
  private _selectedHost!: string;

  public get selectedHost(): string {
    return this._selectedHost;
  }

  public set selectedHost(index: string) {
    this._selectedHost = index;
    this.selectedHostValue = this.hostData[index];
    console.log(this.selectedHost);
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

  async searchclick(event?: Event) {
    if(this.searchCalled == false){
      this.searchCalled = true;
    }
    // Set query parameters if search button is actually clicked
    if(event != null){
      this.router.navigate([], {queryParams: {}});
      let queryParams = Object.assign({},
        this.selectedHost != "" ? { hostname: this.selectedHost } : {},
        this.selectedMethodValue != "Discovery Method" ? { discoverymethod: this.selectedMethodValue } : {},
        this.selectedYearValue != "Discovery Year" ? { disc_year: this.selectedYearValue } : {},
        this.selectedFacilityValue != "Discovery Facility" ? { disc_facility: this.selectedFacilityValue } : {}
      );
      this.router.navigate([], { queryParams });
    }
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
    // Reset all four inputs
    this.selectedHost = '';
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
  }

  clearclick(event: Event) {
    setTimeout(() => {
      this.showTable = false;
      this.clearSelect();
      this.exoplanetData = [];
      this.firstSearch = true;
      this.showNewSearch = false;
      this.cd.detectChanges();
      this.router.navigate([], {queryParams: {}});
    });
  }

  // Only load hostnames if user clicks on select box
  loading: boolean;
  async loadOptions(){
    this.loading = true;
    this.hostData = await this.selectService.getHostData();
    this.selected = true;
    setTimeout(() => {
      this.cd.detectChanges();
    });
    this.loading = false;
  }

  doNothing(){}

  private searchCalled = false;
  // Load query parameters
  async ngAfterViewInit (){
    this.route.queryParams.pipe(skip(1)).subscribe(params => {
      if (Object.keys(params).length > 0) {
        if (params['hostname'] != undefined){
          this.selectedHost = params['hostname'];
        }
        if (params['discoverymethod'] != undefined){
          this.selectedMethodValue = params['discoverymethod'];
        }
        if (params['disc_year'] != undefined){
          this.selectedYearValue = params['disc_year'];
        }
        if (params['disc_facility'] != undefined){
          this.selectedFacilityValue = params['disc_facility'];
        }
        // Only search if first search; Prevents duplicate searches after setting query parameters in searchclick()
        if (!this.searchCalled) {
          this.searchCalled = true;
          this.searchclick();
        }
      }
    });
  }
  
  async ngOnInit() {
      // Load option data for 3 select boxes
    const methodPromise = this.selectService.getMethodData();
    const yearPromise = this.selectService.getYearData();
    const facilityPromise = this.selectService.getFacilityData();
    
    const [ methodData, yearData, facilityData] = await Promise.all([ methodPromise, yearPromise, facilityPromise]);

    // Don't load hostData until user clicks on select box
    this.hostData = [];
    this.methodData = methodData;
    this.yearData = yearData;
    this.facilityData = facilityData;
    this.clearSelect();
  }

  public buildQuery(){
    let firstConditional: boolean = true;
    this.apiQuery = '';
    // First check if select box has valid value then check if any other conditional has been applied 
    (this.selectedHost != '' && this.selectedHost != undefined ? (this.apiQuery += '+where+hostname+=+\'' + this.selectedHost + '\'', firstConditional = false) : this.apiQuery = this.apiQuery);
    (this.selectedMethodValue != "Discovery Method" && this.selectedMethodValue != undefined ? (firstConditional == true ? (this.apiQuery += '+where+discoverymethod+=+\'' + this.selectedMethodValue + '\'', firstConditional = false) : this.apiQuery += '+and+discoverymethod+=+\'' + this.selectedMethodValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedYearValue != "Discovery Year" && this.selectedYearValue != undefined ? (firstConditional == true ? (this.apiQuery += '+where+disc_year+=+\'' + this.selectedYearValue + '\'', firstConditional = false) : this.apiQuery += '+and+disc_year+=+\'' + this.selectedYearValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedFacilityValue != "Discovery Facility" && this.selectedFacilityValue != undefined ? (firstConditional == true ? (this.apiQuery += '+where+disc_facility+=+\''  + this.selectedFacilityValue + '\'', firstConditional = false): this.apiQuery += '+and+disc_facility+=+\''  + this.selectedFacilityValue + '\'') : this.apiQuery = this.apiQuery);
    // Returns true if input is empty
    return firstConditional;
  }

  share(){
    // Copy current URL to clipboard
    navigator.clipboard.writeText('https://jarvisar.github.io/senior-design' + this.router.url).then(
      () => {
        console.log('Text copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  }

  download(){
    this.downloadService.downloadFile(this.exoplanetData, 'exoplanet_data');
  }
}
