import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-exoplanet',
  templateUrl: './exoplanet.component.html',
  styleUrls: ['./exoplanet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExoplanetComponent implements OnInit {
  
  constructor(private data: DataService, private http: HttpClient, public loadingService: LoadingService) { }

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
