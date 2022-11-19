import { Component, OnInit, Input } from '@angular/core';
import { ExoplanetComponent } from '../exoplanet/exoplanet.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() exoplanetData!: Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

  

}
