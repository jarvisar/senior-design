import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';

import { Exoplanet } from './exoplanet'


import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExoplanetComponent implements OnInit { 
  public exoplanetData!: Array<any>;
  
  constructor(private data: DataService, private http: HttpClient, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    
  }

  public apiQuery!: string;
  
  getExoplanetData(input: string){
    var testArray: Array<Exoplanet> = [];
    this.apiQuery = input;
    this.data.getExoPlanetData(this.apiQuery).subscribe((response: any[]) => {
      response.forEach((e: Exoplanet) => {
        
        testArray.push(e)
        
      })
    });
    console.log(this.exoplanetData);
    this.exoplanetData = testArray;
    console.log(this.exoplanetData);
    return this.exoplanetData;
  }

  public trackData (index: number) {
    return this.exoplanetData ? this.exoplanetData : undefined;
  }

}
