import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { LoadingService } from '../loading.service';
import { Exoplanet } from './exoplanet'

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExoplanetComponent implements OnInit {
  
  public exoplanetData: Array<Exoplanet> = [{pl_name: '11 Com b', hostname: '11 Com', discoverymethod: 'Radial Velocity', disc_year: 2007, disc_facility: 'Xinglong Station'}];
  
  constructor(private data: DataService, private http: HttpClient, public loadingService: LoadingService, private cdr: ChangeDetectorRef,) { }
  
  ngOnInit(): void {
    
  }

  public apiQuery!: string;
  
  getExoplanetData(input: string){
    
    var testArray: Array<Exoplanet> = [];
    
    console.log("input: " + input);
    this.apiQuery = input;
    console.log(this.apiQuery);
    this.data.getExoPlanetData(input).subscribe((response: any[]) => {
      response.forEach((e: Exoplanet) => {
        testArray.push(e);
        this.cdr.detectChanges();
        //this.exoplanetData.push(e);
      })
    })
    console.log(testArray)
    this.exoplanetData = testArray;
    console.log(this.exoplanetData)
    
  }

  public trackData (index: number, exoplanet: Exoplanet) {
    return index;
  }

}
