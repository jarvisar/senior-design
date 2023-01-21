import { ChangeDetectionStrategy, Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger,transition,style,animate,state } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { Exoplanet } from '../exoplanet/exoplanet';
import { LoadingService } from '../loading.service';
import { MatPaginator } from '@angular/material/paginator';
import { ExodetailComponent } from '../exodetail/exodetail.component';

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
      transition('blurred => unblurred', animate('400ms ease-out')),
      transition('unblurred => blurred', animate('300ms ease-out'))
    ])
  ]
})
export class TableComponent implements OnInit {
  tableDef = [{column: 'index', title: 'Index'}, {column: 'pl_name', title: 'Planet Name'}, {column: 'hostname', title: 'Host Name'}, {column: 'discoverymethod', title: 'Discovery Method'}, {column: 'disc_year', title: 'Discovery Year'}, {column: 'disc_facility', title: 'Discovery Facility'}];
  displayedColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'disc_facility'];
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Exoplanet>;

  @Input() set exoplanetData(data: Exoplanet[]) {
    this.setTableDataSource(data);
  }
  
  @Input() numResults!: number;

  expandedExoplanet: Exoplanet;
  
  setTableDataSource(data: Exoplanet[]) {
      this.dataSource = new MatTableDataSource<Exoplanet>(data);
      this.updateData();
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

  public showRows: boolean = false;
  
  constructor(public loadingService: LoadingService, private changeDetectorRef: ChangeDetectorRef) {
    // test data for debugging
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

  ngOnInit(): void {
  }
}