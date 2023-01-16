import { Component, AfterViewInit, NgModule } from '@angular/core';
import { DataService } from './data.service';
import { InputbarComponent } from './inputbar/inputbar.component';
import { LoadingService } from './loading.service';
import { trigger,transition,style,animate } from '@angular/animations';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { SecretComponent } from './secret/secret.component';

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
  public konamiCode;
  public currentInput;

  constructor(private data: DataService, public inputbar: InputbarComponent, public loadingService: LoadingService, private renderer: Renderer2, private router: Router, private secret: SecretComponent){
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.currentInput = []
  }

  public ngAfterViewInit(): void {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  //Listen for Konami Code
  @HostListener('document:keyup', ['$event'])
  onKeydown(event: any) {
    // prevents duplicate triggers
    event.stopImmediatePropagation()
    this.currentInput.push(event.key);
    console.log(event.key);
    if (this.currentInput.length > this.konamiCode.length) {
      this.currentInput.shift();
    }
    if (this.currentInput.toString() === this.konamiCode.toString()) {
      this.secret.openDialog();
    }
  }
}



