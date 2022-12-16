import { Component, OnInit, Input } from '@angular/core';
import { Exoplanet } from '../exoplanet/exoplanet';

@Component({
  selector: 'app-exodetail',
  templateUrl: './exodetail.component.html',
  styleUrls: ['./exodetail.component.css']
})
export class ExodetailComponent implements OnInit {

  @Input() exoplanet!: any;

  public pl_name; 
  public hostname; 
  public discoverymethod; 
  public disc_facility; 
 
  public formattedDiscFacility;

  constructor() { }

  ngOnInit(): void {
    this.pl_name = this.exoplanet.pl_name;
    
  }

  nasaEyes(){
    console.log("test");
    var formattedName = this.exoplanet.pl_name.replace(/ /g, "_");
    
    window.open('https://exoplanets.nasa.gov/eyes-on-exoplanets/#/planet/' + formattedName +  '/', '_blank');
  }

}
