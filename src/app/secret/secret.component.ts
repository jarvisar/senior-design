import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
}

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
@Injectable({ providedIn: 'root' })
export class SecretComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  // open secret dialog box
  public openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '50%';
    dialogConfig.minHeight = '80%';
    const dialogRef = this.dialog.open(SecretComponent, dialogConfig);
  }

  goToWiki(planet: Planet) {
    window.open('https://starwars.fandom.com/wiki/' + planet.name);
  }

  planets: Planet[] = [];
  displayedColumns: string[] = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population'];
  tableDef: any = {
    name: {
      header: 'Name',
      type: 'string'
    },
    rotation_period: {
      header: 'Rotation Period',
      type: 'string'
    },
    orbital_period: {
      header: 'Orbital Period',
      type: 'string'
    },
    diameter: {
      header: 'Diameter',
      type: 'string'
    },
    climate: {
      header: 'Climate',
      type: 'string'
    },
    gravity: {
      header: 'Gravity',
      type: 'string'
    },
    terrain: {
      header: 'Terrain',
      type: 'string'
    },
    surface_water: {
      header: 'Surface Water',
      type: 'string'
    },
    population: {
      header: 'Population',
      type: 'string'
    }
  };

  ngOnInit() {
    this.http.get('https://swapi.dev/api/planets/')
      .subscribe((response: any) => {
        this.planets = response.results;
      });
  }

  
}
