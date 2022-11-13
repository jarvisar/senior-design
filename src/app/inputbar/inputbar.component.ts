import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-inputbar',
  templateUrl: './inputbar.component.html',
  styleUrls: ['./inputbar.component.css']
})
export class InputbarComponent implements OnInit {

  hostData: any[] = ["Hostname", ];
  methodData: any[] = ["Discovery Method", ];
  yearData: any[] = ["Discovery Year", ];
  facilityData: any[] = ["Discovery Facility", ];
  
  public selectedHost!: string;
  public selectedMethod!: string;
  public selectedYear!: string;
  public selectedFacility!: string;

  constructor(private papa: Papa, private data: DataService, private http: HttpClient) { }

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

  public getFacilityList() {
    this.http.get('../assets/disc_facility.csv', {responseType: 'text'}).subscribe(data => {
      data.split('\n').forEach(e => {
        e = e.replace(/['"]+/g, '');
        this.facilityData.push(e);
      })
    })
  }
}
