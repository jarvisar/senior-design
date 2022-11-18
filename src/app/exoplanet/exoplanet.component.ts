import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { LoadingService } from '../loading.service';
import { Exoplanet } from './exoplanet'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ExoplanetComponent implements OnInit {
  
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  constructor(private data: DataService, private http: HttpClient, public loadingService: LoadingService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    
  }

  public apiQuery!: string;
  
  getExoplanetData(input: string){
    var testArray: Array<Exoplanet> = [];
    this.apiQuery = input;
    testArray = this.data.getExoPlanetData(input);
    console.log('why no work');
    console.log(this.exoplanetData);
    this.exoplanetData = testArray;
    console.log(this.exoplanetData);
    
  }

  public trackData (index: number, exoplanet: Exoplanet) {
    return exoplanet;
  }

}
