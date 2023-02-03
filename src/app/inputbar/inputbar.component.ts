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

  public exoplanetData: Array<any> = [];
  public numResults: number = 0;
  public showTable: boolean = false;
  public firstSearch: boolean = true;
  public showNewSearch: boolean = false;
  public additionalInputs: boolean = false;
  public error;
  
  // Initialize data to prevent undefined errors
  hostData: any[] = [];
  methodData: any[] = [];
  yearData: any[] = [];
  facilityData: any[] = [];
  selected = false;
  
  // Main inputs
  public selectedHostValue!: string;
  public selectedMethodValue!: string;
  public selectedYearValue!: string;
  public selectedFacilityValue!: string;
  // Additional Inputs
  public selectedMinMass;
  public selectedMaxMass;
  public selectedMaxRadius;
  public selectedMinRadius;
  public selectedMinDensity
  public selectedMaxDensity;
  public selectedStarType;
  public selectedPlanetNum;
  public selectedStarNum;
  public showControversial: boolean = false;

  public apiQuery!: string;
  public previousQueries: string[] = [];

  constructor(private data: DataService, private http: HttpClient, public exoplanet: ExoplanetComponent, private downloadService: DownloadService, 
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

  async searchclick(event?: Event, query?: string) {
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
        this.selectedFacilityValue != "Discovery Facility" ? { disc_facility: this.selectedFacilityValue } : {},
        this.selectedMinMass != undefined || this.selectedMinMass != "" ? { pl_bmasse_min: this.selectedMinMass } : {},
        this.selectedMaxMass != undefined || this.selectedMaxMass != "" ? { pl_bmasse_max: this.selectedMaxMass } : {},
        this.selectedMinRadius != undefined || this.selectedMinRadius != "" ? { pl_rade_min: this.selectedMinRadius } : {},
        this.selectedMaxRadius != undefined || this.selectedMaxRadius != "" ? { pl_rade_max: this.selectedMaxRadius } : {},
        this.selectedMinDensity != undefined || this.selectedMinDensity != "" ? { pl_dens_min: this.selectedMinDensity } : {},
        this.selectedMaxDensity != undefined || this.selectedMaxDensity != "" ? { pl_dens_max: this.selectedMaxDensity } : {},
        this.selectedStarType != undefined && this.selectedStarType != "Star Type" ? { star_type: this.selectedStarType } : {},
        this.selectedPlanetNum != undefined && this.selectedPlanetNum != "# of Planets in System" ? { sy_pnum: this.selectedPlanetNum } : {},
        this.selectedStarNum != undefined && this.selectedStarNum != "# of Stars in System" ? { sy_snum: this.selectedStarNum } : {},
        this.showControversial == true ? { pl_controv_flag: 1 } : {}
      );
      this.router.navigate([], { queryParams });
    }
    // Check for query parameter (used for previous search)
    if (query != undefined){
      this.apiQuery = query;
    } else{
      let emptySearch: boolean = this.buildQuery();
    }
    this.firstSearch = false;
    let newArray: Array<Exoplanet> = [];
    // Call data service
    try{
      let response = await this.data.getExoPlanetData(this.apiQuery);
      response.forEach((e: Exoplanet) => {
        //Add each exoplanet to array
        newArray.push(e)
      });
      this.exoplanetData = newArray;
    } catch (err: any) {
      // Display error message if needed
      console.log("Error loading data");
      this.error = true;
    }
    console.log(this.exoplanetData);
    this.numResults = this.exoplanetData.length;
    this.showTable = true;
  }

  clearSelect() {
    // Reset all inputs
    this.selectedHost = '';
    this.selectedMethod = 0;
    this.selectedYear = 0;
    this.selectedFacility = 0;
    this.selectedMinMass = undefined; 
    this.selectedMaxMass = undefined;
    this.selectedMinRadius = undefined;
    this.selectedMaxRadius = undefined;
    this.selectedMinDensity = undefined;
    this.selectedMaxDensity = undefined;
    this.selectedStarType = 'Star Type';
    this.selectedStarNum = '# of Stars in System';
    this.selectedPlanetNum = '# of Planets in System';
    this.showControversial = false;
  }

  clearclick(event: Event) {
    this.showTable = false;
    this.clearSelect();
    this.exoplanetData = [];
    this.firstSearch = true;
    this.showNewSearch = false;
    // Clear query parameters
    this.router.navigate([], {queryParams: {}});
  }

  // Only load hostnames if user clicks on select box
  loading: boolean;
  async loadOptions(){
    this.loading = true;
    this.hostData = await this.selectService.getHostData();
    this.selected = true;
    this.loading = false;
  }

  doNothing(){}

  previousSearch(event: Event){
    console.log(this.previousQueries.length);
    let query = this.previousQueries.pop();
    if (query != undefined){
      
      this.searchclick(event, query);
      this.clearSelect();
      this.router.navigate([], {queryParams: {}});
    }
  }

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
        if (params['pl_bmasse_min'] != undefined){
          this.selectedMinMass = params['pl_bmasse_min'];
        } 
        if (params['pl_bmasse_max'] != undefined){
          this.selectedMaxMass = params['pl_bmasse_max'];
        } 
        if (params['pl_rade_min'] != undefined){
          this.selectedMinRadius = params['pl_rade_min'];
        } 
        if (params['pl_rade_max'] != undefined){
          this.selectedMaxRadius = params['pl_rade_max'];
        } 
        if (params['pl_dens_min'] != undefined){
          this.selectedMinDensity = params['pl_dens_min'];
        } 
        if (params['pl_dens_max'] != undefined){
          this.selectedMaxDensity = params['pl_dens_max'];
        }
        if (params['star_type'] != undefined){
          this.selectedStarType = params['star_type'];
        }  
        if (params['pl_controv_flag'] != undefined){
          this.showControversial = true;
        }
        if (params['sy_pnum'] != undefined){
          this.selectedPlanetNum = params['sy_pnum'];
        }
        if (params['sy_snum'] != undefined){
          this.selectedStarNum = params['sy_snum'];
        }
        // Only search if first search; Prevents duplicate searches after setting query parameters in searchclick()
        if (!this.searchCalled) {
          this.searchCalled = true;
          this.searchclick();
          this.cd.detectChanges();
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
    if(this.apiQuery != '' && this.apiQuery != undefined){
      // Store previous query
      this.previousQueries.push(this.apiQuery);
    }
    let firstConditional: boolean = true;
    this.apiQuery = '';
    // First check if select box has valid value then check if any other conditional has been applied 
    (this.selectedHost != '' && this.selectedHost != undefined ? (this.apiQuery += '+where+hostname+=+\'' + this.selectedHost + '\'', firstConditional = false) : this.apiQuery = this.apiQuery);
    (this.selectedMethodValue != "Discovery Method" && this.selectedMethodValue != undefined ? (firstConditional == true ? (this.apiQuery += '+where+discoverymethod+=+\'' + this.selectedMethodValue + '\'', firstConditional = false) : this.apiQuery += '+and+discoverymethod+=+\'' + this.selectedMethodValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedYearValue != "Discovery Year" && this.selectedYearValue != undefined ? (firstConditional == true ? (this.apiQuery += '+where+disc_year+=+\'' + this.selectedYearValue + '\'', firstConditional = false) : this.apiQuery += '+and+disc_year+=+\'' + this.selectedYearValue + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedFacilityValue != "Discovery Facility" && this.selectedFacilityValue != undefined ? (firstConditional == true ? (this.apiQuery += '+where+disc_facility+=+\''  + this.selectedFacilityValue + '\'', firstConditional = false): this.apiQuery += '+and+disc_facility+=+\''  + this.selectedFacilityValue + '\'') : this.apiQuery = this.apiQuery);
    // Additional inputs
    (this.selectedMinMass != "" &&   this.selectedMinMass != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_bmasse+>=+\''  + this.selectedMinMass + '\'', firstConditional = false): this.apiQuery += '+and+pl_bmasse+>+\''  + this.selectedMinMass + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedMaxMass != "" &&   this.selectedMaxMass != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_bmasse+<=+\''  + this.selectedMaxMass + '\'', firstConditional = false): this.apiQuery += '+and+pl_bmasse+<+\''  + this.selectedMaxMass + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedMinRadius != "" && this.selectedMinRadius != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_rade+>=+\''  + this.selectedMinRadius + '\'', firstConditional = false): this.apiQuery += '+and+pl_rade+>+\''  + this.selectedMinRadius + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedMaxRadius != "" && this.selectedMaxRadius != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_rade+<=+\''  + this.selectedMaxRadius + '\'', firstConditional = false): this.apiQuery += '+and+pl_rade+<+\''  + this.selectedMaxRadius + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedMinDensity != "" && this.selectedMinDensity != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_dens+>=+\''  + this.selectedMinDensity + '\'', firstConditional = false): this.apiQuery += '+and+pl_dens+>+\''  + this.selectedMinDensity + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedMaxDensity != "" && this.selectedMaxDensity != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_dens+<=+\''  + this.selectedMaxDensity + '\'', firstConditional = false): this.apiQuery += '+and+pl_dens+<+\''  + this.selectedMaxDensity + '\'') : this.apiQuery = this.apiQuery);
    (this.showControversial == true ? (firstConditional == true ? (this.apiQuery += '+where+pl_controv_flag+=+1', firstConditional = false): this.apiQuery += '+and+pl_controv_flag+=+1') : this.apiQuery = this.apiQuery);
    (this.selectedStarType != "Star Type" && this.selectedStarType != undefined ? (firstConditional == true ? (this.apiQuery += '+WHERE+SUBSTR(st_spectype,+1,+1)+=+\'' + this.selectedStarType + '\'' , firstConditional = false): this.apiQuery += '+and+SUBSTR(st_spectype,+1,+1)+=+\'' + this.selectedStarType + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedPlanetNum != "# of Planets in System" && this.selectedPlanetNum != undefined ? (firstConditional == true ? (this.apiQuery += '+WHERE+sy_pnum+=+\'' + this.selectedPlanetNum + '\'' , firstConditional = false): this.apiQuery += '+and+sy_pnum+=+\'' + this.selectedPlanetNum + '\'') : this.apiQuery = this.apiQuery);
    (this.selectedStarNum != "# of Stars in System" && this.selectedStarNum != undefined ? (firstConditional == true ? (this.apiQuery += '+WHERE+sy_snum+=+\'' + this.selectedStarNum + '\'' , firstConditional = false): this.apiQuery += '+and+sy_snum+=+\'' + this.selectedStarNum + '\'') : this.apiQuery = this.apiQuery);
    
    // Returns true if input is empty
    return firstConditional;
  }
}
