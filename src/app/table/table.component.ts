import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
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
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
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
    ])
  ]
})
export class TableComponent implements OnInit {
  // Define table column titles
  tableDef = [
    {column: 'index', title: 'Index'},
    {column: 'pl_name', title: 'Planet Name'},
    {column: 'hostname', title: 'Host Name'},
    {column: 'discoverymethod', title: 'Discovery Method'},
    {column: 'disc_year', title: 'Discovery Year'},
    {column: 'pl_dens', title: 'Density (g/cm³)'},
    {column: 'pl_rade', title: 'Radius'},
    {column: 'pl_bmasse', title: 'Mass'},
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
    {column: 'pl_controv_flag', title: 'Controversial'}
  ];

  // Define which columns to display on table
  displayedColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'pl_rade', 'pl_bmasse', 'pl_dens', 'disc_facility'];
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.actualPaginator = value;
  }

  actualPaginator: MatPaginator;

  @Input() numResults!: number;
  @Input() set exoplanetData(data: Exoplanet[]) {
    this.allExoplanetData = new MatTableDataSource<Exoplanet>(data);
    this.allExoplanetData.paginator = this.paginator;
    this.allExoplanetData.sort = this.sort;
    
    this.setTableDataSource(data.slice(0, 50));
  }

  allExoplanetData: MatTableDataSource<Exoplanet>;
  dataSource: MatTableDataSource<Exoplanet>;
  expandedExoplanet: Exoplanet | null;

  setTableDataSource(data: Exoplanet[]) {
      this.dataSource = new MatTableDataSource<Exoplanet>(data);
      this.updateData();
      this.dataSource.sort = this.sort;
      this.expandedExoplanet = null;
      this.allExoplanetData.sortingDataAccessor = ( exoplanet, property) => {
      switch ( property ) {
        case 'exoplanet.pl_name': return exoplanet.pl_name;
        default: return exoplanet[property];
      }
    };
      
  }

  nextPage(event: PageEvent) {
    let limit = (event.pageIndex * event.pageSize) + event.pageSize;
    let offset = (event.pageIndex * event.pageSize);
    this.dataSource = new MatTableDataSource<Exoplanet>(this.allExoplanetData.data.slice(offset, limit));
    this.dataSource.sort = this.sort;
    this.sortData(this.sort);
  }
  
  constructor(public loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef, public inputbar: InputbarComponent, private downloadService: DownloadService, 
    private router: Router, public columnSettings: SettingsDialogComponent, private dialog: MatDialog) {
    // test data
    // this.dataSource = new MatTableDataSource<Exoplanet>( [{pl_name: "test", hostname: "test", discoverymethod: "test", disc_year: 2000, disc_facility: "Qatar"}, {pl_name: "test2", hostname: "test", discoverymethod: "test", disc_year: 2000, disc_facility: "test"}] );
  }

  blurState = 'unblurred';
  updateData() {
    this.changeDetectorRef.detectChanges();
    this.loadingService.isLoading$.subscribe(isLoading => {
        this.blurState = isLoading ? 'blurred' : 'unblurred';
    });
  }

  sortData(sort: Sort){
    console.log(sort);
    this.sortByColumn(sort.active, sort.direction);
    let limit = (this.actualPaginator.pageIndex * this.actualPaginator.pageSize) + this.actualPaginator.pageSize;
    let offset = (this.actualPaginator.pageIndex * this.actualPaginator.pageSize);
    console.log(limit + " " + offset);
    this.dataSource = new MatTableDataSource<Exoplanet>(this.allExoplanetData.data.slice(offset, limit));
  }

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

  changeColumns(){
    let dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: this.displayedColumns
    })
    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.displayedColumns = res.data;
    })
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

  ngOnInit(): void {
  }
}