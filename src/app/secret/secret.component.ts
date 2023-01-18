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
    const dialogRef = this.dialog.open(SecretComponent, {
      panelClass: 'mat-dialog-container',
    });
  }

  locations = ["tatooine","hoth","jakku","geonosis","bespin","naboo","crait","coruscant","alderaan"];
  displayInfo = false;
  planetImageUrl = 'https://starloggers.files.wordpress.com/2020/01/';

  color(){
    return "hsl("+Math.floor(Math.random()*360)+"deg,100%,40%)"
  }
  
  ngOnInit(): void {}

  
}
