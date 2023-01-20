import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
})
export class ExoplanetComponent implements OnInit { 
  public exoplanetData!: Array<any>;
  public resultsReturned: Boolean = false;

  constructor(private data: DataService) { }
  
  ngOnInit(): void {
  }
}
