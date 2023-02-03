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
  tableDef = [{column: 'index', title: 'Index'}, {column: 'pl_name', title: 'Planet Name'}, {column: 'hostname', title: 'Host Name'}, {column: 'discoverymethod', title: 'Discovery Method'}, 
  {column: 'disc_year', title: 'Discovery Year'}, {column: 'pl_dens', title: 'Density (g/cm³)'}, {column: 'pl_rade', title: 'Radius'}, {column: 'pl_bmasse', title: 'Mass'}, {column: 'disc_facility', title: 'Discovery Facility'}];

  // Define which columns to display on table
  displayedColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'pl_dens', 'pl_rade', 'pl_bmasse', 'disc_facility'];
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() numResults!: number;
  @Input() set exoplanetData(data: Exoplanet[]) {
    this.setTableDataSource(data);
  }

  dataSource: MatTableDataSource<Exoplanet>;
  expandedExoplanet: Exoplanet | null;

  setTableDataSource(data: Exoplanet[]) {
      this.dataSource = new MatTableDataSource<Exoplanet>(data);
      this.updateData();
      this.expandedExoplanet = null;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.sort.active = 'pl_name';
      this.sort.direction = 'desc';
      this.dataSource.sortingDataAccessor = ( exoplanet, property) => {
      switch ( property ) {
        case 'exoplanet.pl_name': return exoplanet.pl_name;
        default: return exoplanet[property];
      }
    };
  }

  nextPage(event:PageEvent){
    let limit = (event.pageIndex * event.pageSize) + event.pageSize;
    let offset = (event.pageIndex * event.pageSize);
  }
  
  constructor(public loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef, public inputbar: InputbarComponent, private downloadService: DownloadService, private router: Router, private columnSettings: SettingsDialogComponent) {
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
    this.dataSource.sort = this.sort;
  }

  changeColumns(){
    this.columnSettings.openDialog();
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