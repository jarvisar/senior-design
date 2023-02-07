import { Component, OnInit, AfterViewInit, Input, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { Exoplanet } from '../exoplanet/exoplanet';
import { LoadingService } from '../loading.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ExodetailComponent } from '../exodetail/exodetail.component';
import { InputbarComponent } from '../inputbar/inputbar.component';
import { DownloadService } from '../download.service';
import { Router } from '@angular/router';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export const fadeInOut = (name = 'fadeInOut', duration = 0.2) =>
  trigger(name, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration}s ease-in-out`)
    ]),
    transition(':leave', [animate(`${duration}s ease-in-out`, style({ opacity: 0 }))])
  ])
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    fadeInOut('fadeinandout'),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('blur', [
      state('blurred', style({
        filter: 'blur(5px)'
      })),
      state('unblurred', style({
        filter: 'none'
      })),
      transition('blurred => unblurred', animate('250ms ease-out')),
      transition('unblurred => blurred', animate('150ms ease-out'))
    ]),
    trigger('columnAnimation', [
      transition('void => *', [
          style({opacity: 0}),
          animate('250ms ease-in', style({opacity: 1}))
      ]),
  ])
  ]
})
export class TableComponent implements OnInit, AfterViewInit {
  // Define table column titles
  tableDef = [
    {column: 'index', title: 'Index'},
    {column: 'pl_name', title: 'Planet Name'},
    {column: 'hostname', title: 'Host Name'},
    {column: 'discoverymethod', title: 'Discovery Method'},
    {column: 'disc_year', title: 'Discovery Year'},
    {column: 'pl_dens', title: 'Density (g/cm³)'},
    {column: 'pl_rade', title: 'Radius (R⊕)'},
    {column: 'pl_bmasse', title: 'Mass (M⊕)'},
    {column: 'disc_facility', title: 'Discovery Facility'},
    {column: 'ra', title: 'RA'},
    {column: 'dec', title: 'Declination'},
    {column: 'rastr', title: 'RA (sexagesimal)'},
    {column: 'decstr', title: 'Declination (sexagesimal)'},
    {column: 'pl_orbper', title: 'Orbital Period (days)'},
    {column: 'pl_orbsmax', title: 'Orbital Radius (au)'},
    {column: 'pl_orbeccen', title: 'Eccentricity'},
    {column: 'st_spectype', title: 'Spectral Type'},
    {column: 'sy_dist', title: 'Distance from Earth (parsecs)'},
    {column: 'sy_snum', title: '# of Stars in System'},
    {column: 'sy_pnum', title: '# of Planets in System'},
    {column: 'sy_mnum', title: '# of Moons in System'},
    {column: 'cb_flag', title: 'Orbits Binary System'},
    {column: 'pl_controv_flag', title: 'Controversial'},
    {column: 'pl_radj', title: 'Planet Radius (J)'},
    {column: 'pl_bmassj', title: 'Planet Mass (J)'},
    {column: 'pl_eqt', title: 'Equilibrium Temp. (K)'},
    {column: 'st_teff', title: 'Stellar Effective Temp. (K)'},
    {column: 'st_rad', title: 'Stellar Radius'},
    {column: 'st_mass', title: 'Stellar Mass'}
  ];

  // Define which columns to display on table
  displayedColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'pl_rade', 'pl_bmasse', 'pl_dens', 'disc_facility'];

  actualPaginator: MatPaginator;
  allExoplanetData: MatTableDataSource<Exoplanet>;
  dataSource: MatTableDataSource<Exoplanet>;
  expandedExoplanets: Exoplanet[] = [];
  blurState = 'unblurred';
  
  @ViewChild('tableContainer', { static: false }) tableContainer: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.actualPaginator = value;
  }

  @Input() numResults!: number;
  @Input() set exoplanetData(data: Exoplanet[]) {
    // Load all exoplanet data in new MatTableDataSource
    this.allExoplanetData = new MatTableDataSource<Exoplanet>(data);
    this.allExoplanetData.paginator = this.paginator;
    this.allExoplanetData.sort = this.sort;
    // Set actual table data source to slice of data
    this.setTableDataSource(data.slice(0, 50));
    this.allExoplanetData.sortingDataAccessor = ( exoplanet, property) => {
      switch ( property ) {
        case 'exoplanet.pl_name': return exoplanet.pl_name;
        default: return exoplanet[property];
      }
    };
  }

  setTableDataSource(data: Exoplanet[]) {
    // Set table data source to slice of exoplanet data
    this.dataSource = new MatTableDataSource<Exoplanet>(data);
    // Blur table if loading new data
    this.loadingService.isLoading$.subscribe(isLoading => {
      this.blurState = isLoading ? 'blurred' : 'unblurred';
    });
    // Reset expanded exoplanet after loading new data
    this.expandedExoplanets = [];
  }

  constructor(public loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef, public inputbar: InputbarComponent, private downloadService: DownloadService, 
    private router: Router, public columnSettings: SettingsDialogComponent, private dialog: MatDialog) {
    // test data
    // this.dataSource = new MatTableDataSource<Exoplanet>( [{pl_name: "test", hostname: "test", discoverymethod: "Transit", disc_year: 2000, disc_facility: "Kepler"}, {pl_name: "test2", hostname: "test", discoverymethod: "test", disc_year: 2000, disc_facility: "test"}] );
  }

  /* Triggered by user changing page on mat-paginator  */
  pageChange(event: PageEvent) {
    let limit = (event.pageIndex * event.pageSize) + event.pageSize;
    limit = Math.min(this.allExoplanetData.data.length, limit)
    let offset = (event.pageIndex * event.pageSize);
    if(this.allExoplanetData.data.length < 50){
      this.dataSource = new MatTableDataSource<Exoplanet>(this.allExoplanetData.data.slice(0, this.allExoplanetData.data.length));
    } else {
      this.dataSource = new MatTableDataSource<Exoplanet>(this.allExoplanetData.data.slice(offset, limit));
      this.dataSource.paginator = null;
    }
    
  }

  /* Triggered by user clicking on header to sort */
  sortData(sort: Sort){
    this.sortByColumn(sort.active, sort.direction);
    let limit = (this.actualPaginator.pageIndex * this.actualPaginator.pageSize) + this.actualPaginator.pageSize;
    let offset = (this.actualPaginator.pageIndex * this.actualPaginator.pageSize);
    this.dataSource = new MatTableDataSource<Exoplanet>(this.allExoplanetData.data.slice(offset, limit));
  }

  /* Sorts allExoplanetData */
  sortByColumn(columnName: string, direction: string) {
    if(direction == "asc"){
      this.allExoplanetData.data.sort((a, b) => {
        if (a[columnName] < b[columnName]) return -1;
        if (a[columnName] > b[columnName]) return 1;
        return 0;
      });
    } else if(direction == "desc"){
      this.allExoplanetData.data.sort((a, b) => {
        if (a[columnName] > b[columnName]) return -1;
        if (a[columnName] < b[columnName]) return 1;
        return 0;
      });
    } else {
      this.allExoplanetData.data.sort();
    }
  }

  toggleExoplanet(exoplanet) {
    if (this.expandedExoplanets.includes(exoplanet)) {
      this.expandedExoplanets = this.expandedExoplanets.filter(e => e !== exoplanet);
    } else {
      this.expandedExoplanets.push(exoplanet);
    }
  }

  changeColumns(){
    let dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: this.displayedColumns
    })
    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.displayedColumns = res.data;
    })
  }
  
  closeRows(){
    this.expandedExoplanets = [];
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
    this.downloadService.downloadFile(this.inputbar.exoplanetData, 'exoplanet_data');
  }

  ngOnInit(): void {}

  // Calculate max number of rows visible on screen
  numberOfRows;
  ngAfterViewInit(): void {
    this.calculateNumberOfRows();
    window.addEventListener('resize', () => {
      this.calculateNumberOfRows();
    });
  }
  
  calculateNumberOfRows(): void {
    const viewportHeight = window.innerHeight;
    const rowHeight = 48;
    this.numberOfRows = Math.floor((viewportHeight - 240) / rowHeight);
  }
}