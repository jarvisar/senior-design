import { Component, OnInit, Input } from '@angular/core';
import { Exoplanet } from '../exoplanet/exoplanet';
import { DataService } from '../data.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() exoplanetData!: Array<any>;
  

  headers = ['Planet Name', 'Host Name', 'Discovery method', 'Dikscovery Year', 'Dikscovery Facility'];

  constructor() { }
  
  ngOnInit(): void {
  }
}
