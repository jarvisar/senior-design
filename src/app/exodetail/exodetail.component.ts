import { Component, OnInit, Input } from '@angular/core';
import { Exoplanet } from '../exoplanet/exoplanet';

@Component({
  selector: 'app-exodetail',
  templateUrl: './exodetail.component.html',
  styleUrls: ['./exodetail.component.css']
})
export class ExodetailComponent implements OnInit {

  @Input() exoplanet!: any;
 
  public formattedDiscFacility;

  constructor() { 
  }

  ngOnInit(): void {
    this.formatDiscFacility(); 
  }

  nasaEyes(){
    var formattedName = this.exoplanet.pl_name.replace(/ /g, "_");
    window.open('https://exoplanets.nasa.gov/eyes-on-exoplanets/#/planet/' + formattedName +  '/', '_blank');
  }

  // Ensures discovery facility image is loaded correctly
  formatDiscFacility() {
    if (this.exoplanet.disc_facility == "KELT-North"){
      this.formattedDiscFacility = "KELT-North600x307";
    }
    else if (this.exoplanet.disc_facility == "SuperWASP-North"){
      this.formattedDiscFacility = "super-wasp-n600x307";
    }
    else if (this.exoplanet.disc_facility == "KELT-South"){
      this.formattedDiscFacility = "KELT-South600x307";
    }
    else if (this.exoplanet.disc_facility == "SuperWASP-South"){
      this.formattedDiscFacility = "image_SuperWASP";
    }
    else if (this.exoplanet.disc_facility == "Calar Alto Observatory"){
      this.formattedDiscFacility = "Calar_alto_600x307";
    }
    else if (this.exoplanet.disc_facility == "Transiting Exoplanet Survey Satellite (TESS)"){
      this.formattedDiscFacility = "image_TESS_TransitingExoplanetSurveySatellite";
    }
    else if (this.exoplanet.disc_facility == "KOINet") {
      this.formattedDiscFacility = "KOINet600x307";
    }
    else if (this.exoplanet.disc_facility == "Acton Sky Portal Observatory") {
      this.formattedDiscFacility = "Acton_generic600x307";
    }
    else if (this.exoplanet.disc_facility == "Mauna Kea Observatory") {
      this.formattedDiscFacility = "ukirt_600x307";
    }
    else{
      this.formattedDiscFacility = "image_" + this.exoplanet.disc_facility.replace(/ /g, "").replace(/\./g, "_").replace(/-/g, "_");
    } 
  }

  public methodDict = {
    'Transit Timing Variations': 'value1',
    'Radial Velocity': 'value2',
    'Transit': 'value2',
    'Orbital Brightness Modulation': 'value2',
    'Disk Kinematics': 'value2',
    'Eclipse Timing Variations': 'value2',
    'Pulsation Timing Variations': 'value2',
    'Astrometry': 'value2',
    'Imaging': 'value2',
    'Microlensing': 'value2',
    'Pulsar Timing': 'value2'
  };
}
