import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Exoplanet } from './exoplanet'

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
})
export class ExoplanetComponent implements OnInit { 
  public exoplanetData!: Array<any>;

  constructor(private data: DataService) { }
  
  ngOnInit(): void {
  }

  getExoplanetData(input: string){
    //Create blank array for new search
    var newArray: Array<Exoplanet> = [];

    this.data.getExoPlanetData(input).subscribe((response: any[]) => {
      response.forEach((e: Exoplanet) => {
        //Add each exoplanet to array
        newArray.push(e)
      })
    });

    this.exoplanetData = newArray;
    return this.exoplanetData;
  }
}
