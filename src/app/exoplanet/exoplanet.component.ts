import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '../loading.service';
import { Exoplanet } from './exoplanet'

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExoplanetComponent implements OnInit {
  
  public exoplanetData: Exoplanet[] = [{pl_name: 'test', hostname: 'test', discoverymethod: 'test', disc_year: 'test', disc_facility: 'test'}];
  
  constructor(private data: DataService, private http: HttpClient, public loadingService: LoadingService) { }
  
  ngOnInit(): void {
    
  }

  public apiQuery!: string;
  
  getExoplanetData(input: string){
    
    
    
    this.apiQuery = input;
    console.log(this.apiQuery);
    this.data.getExoPlanetData(input).subscribe((response: any[]) => {
      response.forEach((e: Exoplanet) => {
        this.exoplanetData.push(e);
      })
    })
    
    console.log(this.exoplanetData);
    
  }

}
