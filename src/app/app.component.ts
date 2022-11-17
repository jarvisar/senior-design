import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from './data.service';
import { InputbarComponent } from './inputbar/inputbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'senior-design';

  constructor(private data: DataService, public inputbar: InputbarComponent){}

  public ngOnInit(): void {
    console.log("test");
  }

  
  
}



