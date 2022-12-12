import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table';
import { trigger,transition,style,animate,state } from '@angular/animations';
import {MatSort, Sort } from '@angular/material/sort';
import { Exoplanet } from '../exoplanet/exoplanet';

export const fadeInOut = (name = 'fadeInOut', duration = 0.1) =>
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
    fadeInOut('fadeinandout', 0.1),
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements OnInit {
  
  tableDef = [{column: 'pl_name', title: 'Planet Name'}, {column: 'hostname', title: 'Host Name'}, {column: 'discoverymethod', title: 'Discovery Method'}, {column: 'disc_year', title: 'Discovery Year'}, {column: 'disc_facility', title: 'Discovery Facility'}];
  displayedColumns = ['pl_name', 'hostname', 'discoverymethod', 'disc_year', 'disc_facility'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<Exoplanet>;

  @Input() set exoplanetData(data: Exoplanet[]) {
    this.setTableDataSource(data);
  }
  
  @Input() numResults!: number;

  expandedExoplanet: Exoplanet;
  
  setTableDataSource(data: Exoplanet[]) {
      this.dataSource = new MatTableDataSource<Exoplanet>(data);
      this.dataSource.sort = this.sort;
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
  
  constructor() {
    this.dataSource = new MatTableDataSource<Exoplanet>( this.exoplanetData );
  }

  ngOnInit(): void {
  }

  sortData(sort: Sort){
    this.dataSource.sort = this.sort;
  }


  // BIG TODOS
  // 1. Add exoplanet detail component? Can pass in exoplanet name as a parameter to pull data
  //    a. Load component if a row is expanded using *ngIf
  // 2. Fix table animations

}