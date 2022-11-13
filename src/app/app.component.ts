import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'senior-design';
  
  hostData: any[] = ["Hostname", ];
  methodData: any[] = ["Discovery Method", ];

  constructor(private data: DataService){}

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
    this.selectedHost = this.hostData[index];
    console.log(this.selectedHost);
  }

  public ngOnInit(): void {
    this.getHostList();
    this.selectedIndex = 0;
    console.log("test1");
  }

  public getHostList() {
    this.data.getHostList().subscribe(data => {
      data.split('\n').forEach(e => {
        e.replace('O', '')
        this.hostData.push(e);
      })
        
    })
    console.log("test2");
  }
  
}



