import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
@Injectable()
export class SettingsDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  // Opens help box window
  public openDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);
  }

  ngOnInit(): void {
  }

}
