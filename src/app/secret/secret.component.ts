import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
@Injectable({ providedIn: 'root' })
export class SecretComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  // open secret da]ialog box
  public openDialog() {
    const dialogRef = this.dialog.open(SecretComponent);
  }

  ngOnInit(): void {}
}
