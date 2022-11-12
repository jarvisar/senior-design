import { Component, OnInit, NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'senior-design';
  
  public selectedHost!: string;

  private _selectedIndex!: number;

  public get selectedIndex(): number {
    return this._selectedIndex;
  }

  public set selectedIndex(index: number) {
    this._selectedIndex = index;

    // Here you can set variable you would usualy set with the ngModel,
    // using the provided index and the array I gues, where your names,
    // addresses and social numbers are stored
    // e.g.: this.selectedName = this.names[index];
    this.selectedHost = `Name ${++index}; Address ${index}; Social-SSN ${index}`;
  }

  public ngOnInit(): void {
    this.selectedIndex = 0;
  }
}



