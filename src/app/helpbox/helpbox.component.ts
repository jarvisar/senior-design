import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-helpbox',
  templateUrl: './helpbox.component.html',
  styleUrls: ['./helpbox.component.css']
})
@Injectable()
export class HelpboxComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  public openDialog() {
    const dialogRef = this.dialog.open(HelpboxComponent);
  }

  ngOnInit(): void {
  }

}


