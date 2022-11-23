import { Component, OnInit, Input } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { trigger,transition,style,animate,state } from '@angular/animations';

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
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements OnInit {
  @Input() exoplanetData!: Array<any>;
  @Input() numResults!: number;

  dataSource = this.exoplanetData;
  
  displayedColumns = ['pl_name'];

  public showRows: boolean = false;
  
  headers = ['Planet Name', 'Host Name', 'Discovery method', 'Discovery Year', 'Discovery Facility'];
  
  constructor() {}
  
  ngOnInit(): void {
    if (this.exoplanetData.length != 0){
      this.showRows = true;
    }
  }

  nasaEyes(exoplanet: any){
    console.log("test");
    var formattedName = exoplanet.pl_name.replace(/ /g, "_");
    
    window.open('https://exoplanets.nasa.gov/eyes-on-exoplanets/#/planet/' + formattedName +  '/', '_blank');
  }

  
}
