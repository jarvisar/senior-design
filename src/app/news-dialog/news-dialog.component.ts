import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.css']
})
@Injectable()
export class NewsDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  // Opens news dialog
  public openDialog() {
    const dialogRef = this.dialog.open(NewsDialogComponent);
  }

  ngOnInit(): void {
  }
}
