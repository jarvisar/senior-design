import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Exoplanet } from './exoplanet';

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css']
})
export class ExoplanetComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public apiQuery!: string;
  
  getExoplanetData(input: string){
    this.apiQuery = input;
    console.log(this.apiQuery);
    this.data.getExoPlanetData(input).subscribe(data => {
      console.log(data);
    })
  }

}
