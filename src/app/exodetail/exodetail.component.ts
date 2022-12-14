import { Component, OnInit, Input } from '@angular/core';
import { Exoplanet } from '../exoplanet/exoplanet';

@Component({
  selector: 'app-exodetail',
  templateUrl: './exodetail.component.html',
  styleUrls: ['./exodetail.component.css']
})
export class ExodetailComponent implements OnInit {

  @Input() exoplanet!: any;

  pl_name = this.exoplanet.pl_name;
  hostname = this.exoplanet.hostname;
  discoverymethod = this.exoplanet.discoverymethod;
  disc_facility = this.exoplanet.disc_facility;
 
  public formattedDiscFacility;

  constructor() { }

  ngOnInit(): void {
    this.formattedDiscFacility = this.disc_facility?.replace(/ /g, "_");
    
  }

}
