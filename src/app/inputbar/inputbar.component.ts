import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css']
})
export class InputbarComponent implements OnInit {

  hostData: any[] = ["Hostname", ];
  methodData: any[] = ["Discovery Method", ];
  
  constructor(private data: DataService) { }

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

  ngOnInit(): void {
    this.getHostList();
    this.selectedIndex = 0;
    console.log("test1");
  }

  public getHostList() {
    this.data.getHostList().subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        this.hostData.push(e);
      })
        
    })
    console.log("test2");
  }

}
