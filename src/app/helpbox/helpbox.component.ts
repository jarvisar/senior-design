import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-helpbox',
  templateUrl: './helpbox.component.html',
  styleUrls: ['./helpbox.component.css']
})
@Injectable()
export class HelpboxComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  // Opens help box window
  public openDialog() {
    const dialogRef = this.dialog.open(HelpboxComponent);
  }

  ngOnInit(): void {
  }
}


