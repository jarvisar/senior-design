import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../data.service';
import { ExoplanetComponent } from '../exoplanet/exoplanet.component';
import { DownloadService } from '../download.service';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { Exoplanet } from '../exoplanet/exoplanet';
import { LoadingService } from '../loading.service'
import { SelectService } from '../select.service';
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
            animate('.15s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate('.15s ease-in', 
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
  
  // Holds current query
  public query = {
    // Inputs
    "selectedHost": "",
    "selectedMethod": "",
    "selectedYear": "",
    "selectedFacility": "",
    // Number Input
    "selectedMinMass": undefined as number | undefined,
    "selectedMaxMass": undefined as number | undefined,
    "selectedMinRadius": undefined as number | undefined,
    "selectedMaxRadius": undefined as number | undefined,
    "selectedMinDensity": undefined as number | undefined,
    "selectedMaxDensity": undefined as number | undefined,
    // Select Drop-down
    "selectedStarType": "Star Type",
    "selectedStarNum": "# of Stars in System",
    "selectedPlanetNum": "# of Planets in System",
    // Checkbox
    "showControversial": false,
    // Sky Region Coords
    "westCornerRa": undefined as number | undefined,
    "eastCornerRa": undefined as number | undefined,
    "southCornerDec": undefined as number | undefined,
    "northCornerDec": undefined as number | undefined
  }
  
  public apiQuery!: string;
  public previousQueries: any = [];

  constructor(private data: DataService, private http: HttpClient, public exoplanet: ExoplanetComponent, private downloadService: DownloadService, 
    public loadingService: LoadingService, public selectService: SelectService, private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, 
    @Inject(DOCUMENT) public document: Document) {
  }

  async searchclick(event?: Event, query?: any) {
    if(this.searchCalled == false){
      this.searchCalled = true;
    }
    // Set query parameters if search button is actually clicked
    if(event != null){
      this.router.navigate([], {queryParams: {}});
      let queryParams = Object.assign({}, // Clear old paramaters
        this.query.selectedHost != "" ? { hostname: this.query.selectedHost } : {},
        this.query.selectedMethod != "" ? { discoverymethod: this.query.selectedMethod } : {},
        this.query.selectedYear != "" ? { disc_year: this.query.selectedYear } : {},
        this.query.selectedFacility != "" ? { disc_facility: this.query.selectedFacility } : {},
        this.query.selectedMinMass != undefined || this.query.selectedMinMass != "" ? { pl_bmasse_min: this.query.selectedMinMass } : {},
        this.query.selectedMaxMass != undefined || this.query.selectedMaxMass != "" ? { pl_bmasse_max: this.query.selectedMaxMass } : {},
        this.query.selectedMinRadius != undefined || this.query.selectedMinRadius != "" ? { pl_rade_min: this.query.selectedMinRadius } : {},
        this.query.selectedMaxRadius != undefined || this.query.selectedMaxRadius != "" ? { pl_rade_max: this.query.selectedMaxRadius } : {},
        this.query.selectedMinDensity != undefined || this.query.selectedMinDensity != "" ? { pl_dens_min: this.query.selectedMinDensity } : {},
        this.query.selectedMaxDensity != undefined || this.query.selectedMaxDensity != "" ? { pl_dens_max: this.query.selectedMaxDensity } : {},
        this.query.selectedStarType != undefined && this.query.selectedStarType != "Star Type" ? { star_type: this.query.selectedStarType } : {},
        this.query.selectedPlanetNum != undefined && this.query.selectedPlanetNum != "# of Planets in System" ? { sy_pnum: this.query.selectedPlanetNum } : {},
        this.query.selectedStarNum != undefined && this.query.selectedStarNum != "# of Stars in System" ? { sy_snum: this.query.selectedStarNum } : {},
        this.query.showControversial == true ? { pl_controv_flag: 1 } : {},
        this.query.westCornerRa != undefined || this.query.westCornerRa != "" ? { westCornerRa: this.query.westCornerRa } : {},
        this.query.eastCornerRa != undefined || this.query.eastCornerRa != "" ? { eastCornerRa: this.query.eastCornerRa } : {},
        this.query.southCornerDec != undefined || this.query.southCornerDec != "" ? { southCornerDec: this.query.southCornerDec } : {},
        this.query.northCornerDec != undefined || this.query.northCornerDec != "" ? { northCornerDec: this.query.northCornerDec } : {}
      );
      this.router.navigate([], { queryParams }); // Set new paramaters
    }
    if (query != undefined){ // Use previous query set if parameter is defined, else build query using inputs
      this.query = query;
    } else{ 
      this.previousQueries.push(JSON.parse(JSON.stringify(this.query)));
      let emptySearch: boolean = this.buildQuery();
    }
    this.firstSearch = false;
    let newArray: Array<Exoplanet> = [];
    try {
      let response = await this.data.getExoPlanetData(this.apiQuery, this.query);
      newArray = response.map((e: Exoplanet) => {
        return e;
      });
      this.exoplanetData = newArray;
    } catch (err: any) {
      console.log("Error loading data");     // Display error message if unsuccessful
      console.log(err);
      this.error = true;
    }
    console.log(this.exoplanetData);
    this.numResults = this.exoplanetData.length;
    this.showTable = true; // Display the table
  }

  // Set four corners of sky region
  searchNearby(event, eastCornerRa, westCornerRa, southCornerDec, northCornerDec){
    this.query.eastCornerRa  = eastCornerRa;
    this.query.westCornerRa = westCornerRa;
    this.query.southCornerDec = southCornerDec;
    this.query.northCornerDec = northCornerDec;
    this.searchclick(event);
  }

  // Reset all inputs
  clearSelect() {
    this.query.selectedHost = '';
    this.query.selectedMethod = '';
    this.query.selectedYear = '';
    this.query.selectedFacility = '';
    this.query.selectedMinMass = undefined; 
    this.query.selectedMaxMass = undefined;
    this.query.selectedMinRadius = undefined;
    this.query.selectedMaxRadius = undefined;
    this.query.selectedMinDensity = undefined;
    this.query.selectedMaxDensity = undefined;
    this.query.selectedStarType = 'Star Type';
    this.query.selectedStarNum = '# of Stars in System';
    this.query.selectedPlanetNum = '# of Planets in System';
    this.query.showControversial = false;
    this.query.westCornerRa = undefined;
    this.query.eastCornerRa = undefined;
    this.query.southCornerDec = undefined;
    this.query.northCornerDec = undefined;
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
    this.loading = true; // Sets placeholder to 'Loading...'
    this.hostData = await this.selectService.getHostData();
    this.selected = true;
    this.loading = false;
  }

  doNothing(){}

  previousSearch(event: Event){
    // Get second element by popping first two elements and pushing first one back
    let queryFirst = this.previousQueries.pop();
    let query = this.previousQueries.pop(); // Get second element
    this.previousQueries.push(JSON.parse(JSON.stringify(queryFirst)));
    if (query != undefined){
      this.query = query;
      this.searchclick(event, query);
    }
  }

  public searchCalled = false;
  async ngAfterViewInit (){
    this.clearSelect(); // Clear current input
    this.route.queryParams.pipe(skip(1)).subscribe(params => {   // Load query parameters
      if (Object.keys(params).length > 0) {
        if (params['hostname'] != undefined){   // If parameter is defined, set value in query
          this.query.selectedHost = params['hostname'];
        }
        if (params['discoverymethod'] != undefined){
          this.query.selectedMethod = params['discoverymethod'];
        } 
        if (params['disc_year'] != undefined){
          this.query.selectedYear = params['disc_year'];
        } 
        if (params['disc_facility'] != undefined){
          this.query.selectedFacility = params['disc_facility'];
        } 
        if (params['pl_bmasse_min'] != undefined){
          this.query.selectedMinMass = params['pl_bmasse_min'];
        } 
        if (params['pl_bmasse_max'] != undefined){
          this.query.selectedMaxMass = params['pl_bmasse_max'];
        } 
        if (params['pl_rade_min'] != undefined){
          this.query.selectedMinRadius = params['pl_rade_min'];
        } 
        if (params['pl_rade_max'] != undefined){
          this.query.selectedMaxRadius = params['pl_rade_max'];
        } 
        if (params['pl_dens_min'] != undefined){
          this.query.selectedMinDensity = params['pl_dens_min'];
        } 
        if (params['pl_dens_max'] != undefined){
          this.query.selectedMaxDensity = params['pl_dens_max'];
        }
        if (params['star_type'] != undefined){
          this.query.selectedStarType = params['star_type'];
        }  
        if (params['pl_controv_flag'] != undefined){
          this.query.showControversial = true;
        }
        if (params['sy_pnum'] != undefined){
          this.query.selectedPlanetNum = params['sy_pnum'];
        }
        if (params['sy_sum'] != undefined){
          this.query.selectedStarNum = params['sy_snum'];
        }
        if (params['westCornerRa'] != undefined){
          this.query.westCornerRa = params['westCornerRa'];
        }
        if (params['eastCornerRa'] != undefined){
          this.query.eastCornerRa = params['eastCornerRa'];
        }
        if (params['southCornerDec'] != undefined){
          this.query.southCornerDec = params['southCornerDec'];
        }
        if (params['northCornerDec'] != undefined){
          this.query.northCornerDec = params['northCornerDec'];
        }
        // Prevent duplicate searches by only searching if first search
        if (!this.searchCalled) {
          this.searchCalled = true;
          this.searchclick();
          this.cd.detectChanges();
        }
      }
    });
  }
  
  async ngOnInit() {
    const methodPromise = this.selectService.getMethodData();
    const yearPromise = this.selectService.getYearData();              // Load option data for 3 select boxes
    const facilityPromise = this.selectService.getFacilityData();
    const [ methodData, yearData, facilityData] = await Promise.all([ methodPromise, yearPromise, facilityPromise]);

    // Don't load hostData until user clicks on select box
    this.hostData = [];
    this.methodData = methodData;
    this.yearData = yearData;
    this.facilityData = facilityData;

    // Cache all exoplanet data asynchronously (not on main thread)
    setTimeout(() => {
      this.data.getAllExoplanetData();
    });
  }

  public buildQuery(){ // Builds SQL query using current query set
    let firstConditional: boolean = true;
    this.apiQuery = '';
    // First check if input has valid value then check if any other conditional has been applied to determine whether to use 'where' or 'and'
    (this.query.selectedHost != '' && this.query.selectedHost != undefined ? (this.apiQuery += '+where+hostname+=+\'' + this.query.selectedHost + '\'', firstConditional = false) : this.apiQuery = this.apiQuery);
    (this.query.selectedMethod != '' && this.query.selectedMethod != undefined ? (firstConditional == true ? (this.apiQuery += '+where+discoverymethod+=+\'' + this.query.selectedMethod + '\'', firstConditional = false) : this.apiQuery += '+and+discoverymethod+=+\'' + this.query.selectedMethod + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedYear != '' && this.query.selectedYear != undefined ? (firstConditional == true ? (this.apiQuery += '+where+disc_year+=+\'' + this.query.selectedYear + '\'', firstConditional = false) : this.apiQuery += '+and+disc_year+=+\'' + this.query.selectedYear + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedFacility != '' && this.query.selectedFacility != undefined ? (firstConditional == true ? (this.apiQuery += '+where+disc_facility+=+\''  + this.query.selectedFacility + '\'', firstConditional = false): this.apiQuery += '+and+disc_facility+=+\''  + this.query.selectedFacility + '\'') : this.apiQuery = this.apiQuery);
    // Additional inputs
    (this.query.selectedMinMass != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_bmasse+>=+\''  + this.query.selectedMinMass + '\'', firstConditional = false): this.apiQuery += '+and+pl_bmasse+>+\''  + this.query.selectedMinMass + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedMaxMass != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_bmasse+<=+\''  + this.query.selectedMaxMass + '\'', firstConditional = false): this.apiQuery += '+and+pl_bmasse+<+\''  + this.query.selectedMaxMass + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedMinRadius != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_rade+>=+\''  + this.query.selectedMinRadius + '\'', firstConditional = false): this.apiQuery += '+and+pl_rade+>+\''  + this.query.selectedMinRadius + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedMaxRadius != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_rade+<=+\''  + this.query.selectedMaxRadius + '\'', firstConditional = false): this.apiQuery += '+and+pl_rade+<+\''  + this.query.selectedMaxRadius + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedMinDensity != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_dens+>=+\''  + this.query.selectedMinDensity + '\'', firstConditional = false): this.apiQuery += '+and+pl_dens+>+\''  + this.query.selectedMinDensity + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedMaxDensity != undefined ? (firstConditional == true ? (this.apiQuery += '+where+pl_dens+<=+\''  + this.query.selectedMaxDensity + '\'', firstConditional = false): this.apiQuery += '+and+pl_dens+<+\''  + this.query.selectedMaxDensity + '\'') : this.apiQuery = this.apiQuery);
    (this.query.showControversial == true ? (firstConditional == true ? (this.apiQuery += '+where+pl_controv_flag+=+1', firstConditional = false): this.apiQuery += '+and+pl_controv_flag+=+1') : this.apiQuery = this.apiQuery);
    (this.query.selectedStarType != "Star Type" && this.query.selectedStarType != undefined ? (firstConditional == true ? (this.apiQuery += '+WHERE+SUBSTR(st_spectype,+1,+1)+=+\'' + this.query.selectedStarType + '\'' , firstConditional = false): this.apiQuery += '+and+SUBSTR(st_spectype,+1,+1)+=+\'' + this.query.selectedStarType + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedPlanetNum != "# of Planets in System" && this.query.selectedPlanetNum != undefined ? (firstConditional == true ? (this.apiQuery += '+WHERE+sy_pnum+=+\'' + this.query.selectedPlanetNum + '\'' , firstConditional = false): this.apiQuery += '+and+sy_pnum+=+\'' + this.query.selectedPlanetNum + '\'') : this.apiQuery = this.apiQuery);
    (this.query.selectedStarNum != "# of Stars in System" && this.query.selectedStarNum != undefined ? (firstConditional == true ? (this.apiQuery += '+WHERE+sy_snum+=+\'' + this.query.selectedStarNum + '\'' , firstConditional = false): this.apiQuery += '+and+sy_snum+=+\'' + this.query.selectedStarNum + '\'') : this.apiQuery = this.apiQuery);
    // Returns true if input is empty (returns all exoplanet data)
    return firstConditional;
  }
}
