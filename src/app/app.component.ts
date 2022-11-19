import { Component, AfterViewInit, NgModule } from '@angular/core';
import { DataService } from './data.service';
import { InputbarComponent } from './inputbar/inputbar.component';
import { LoadingService } from './loading.service';
import { trigger,transition,style,animate } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { Renderer2 } from '@angular/core';

export const fadeInOut = (name = 'fadeInOut', duration = 0.1) =>
  trigger(name, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration}s ease-in-out`)
    ]),
    transition(':leave', [animate(`${duration}s ease-in-out`, style({ opacity: 0 }))])
  ])
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInOut('fadeinandout', 0.3),
  ]
})
export class AppComponent implements AfterViewInit  {
  title = 'senior-design';

  public testArray: Array<any> = [];
  constructor(private data: DataService, public inputbar: InputbarComponent, public loadingService: LoadingService, private renderer: Renderer2){}

  public ngAfterViewInit(): void {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
  
  
  
}



