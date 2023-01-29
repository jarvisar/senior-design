import { Component, OnInit, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-helpbox',
  templateUrl: './helpbox.component.html',
  styleUrls: ['./helpbox.component.css']
})
@Injectable()
export class HelpboxComponent implements OnInit {
  
  constructor(public dialog: MatDialog, public datepipe: DatePipe) { }

  currentDatetime;

  // Opens help box window
  public openDialog() {
    this.currentDatetime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.log(this.currentDatetime);
    const dialogRef = this.dialog.open(HelpboxComponent);
  }

  ngOnInit(): void {
  }

}


