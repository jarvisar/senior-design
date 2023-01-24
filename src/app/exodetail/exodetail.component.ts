import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InputbarComponent } from '../inputbar/inputbar.component';

@Component({
  selector: 'app-exodetail',
  templateUrl: './exodetail.component.html',
  styleUrls: ['./exodetail.component.css']
})
export class ExodetailComponent implements OnInit {
  @ViewChild('refContainer', { static: true, read: ElementRef }) anchorContainer: ElementRef;

  @Input() exoplanet!: any;
 
  public imgError: boolean = false;
  public formattedDiscFacility;
  public href;

  constructor(public inputbar: InputbarComponent) {
  }

  ngOnInit(): void {
    this.formatDiscFacility(); 
    // Pull link/href from disc_refname anchor element
    this.anchorContainer.nativeElement.innerHTML = this.exoplanet.disc_refname;
    var anchor = this.anchorContainer.nativeElement.querySelector('a');
    this.href = anchor.getAttribute('href');
  }

  nasaEyes(){
    var formattedName = this.exoplanet.pl_name.replace(/ /g, "_");
    window.open('https://exoplanets.nasa.gov/eyes-on-exoplanets/#/planet/' + formattedName +  '/', '_blank');
  }

  openRef(){
    window.open(this.href);
  }

  openOverview(){
    window.open("https://exoplanetarchive.ipac.caltech.edu/overview/" + this.exoplanet.pl_name);
  }

  async searchHost(event: Event){
    this.setValues(this.inputbar.hostData.findIndex(host => host === this.exoplanet.hostname),0,0,0);
    this.inputbar.selectedHostValue = this.exoplanet.hostname;
    this.inputbar.searchclick(event);
  }

  async searchMethod(event: Event){
    this.setValues(0,this.inputbar.methodData.findIndex(method => method === this.exoplanet.discoverymethod),0,0);
    console.log(this.exoplanet.discoverymethod);
    this.inputbar.selectedMethodValue = this.exoplanet.discoverymethod;
    this.inputbar.searchclick(event);
  }

  async searchYear(event: Event){
    this.setValues(0,0,this.inputbar.yearData.findIndex(year => year === this.exoplanet.disc_year),0);
    this.inputbar.selectedYearValue = this.exoplanet.disc_year;
    this.inputbar.searchclick(event);
  }

  async searchFacility(event: Event){
    this.setValues(0,0,0,this.inputbar.facilityData.findIndex(facility => facility === this.exoplanet.disc_facility));
    this.inputbar.selectedFacilityValue = this.exoplanet.disc_facility;
    this.inputbar.searchclick(event);
  }

  setValues(host = 0, method = 0, year = 0, facility = 0){
    this.inputbar.selectedHost = host;
    this.inputbar.selectedMethod = method;
    this.inputbar.selectedYear = year;
    this.inputbar.selectedFacility = facility;
    this.inputbar.exoplanetData = [];
    this.inputbar.firstSearch = true;
  }

  // Ensures discovery facility image is loaded correctly
  formatDiscFacility() {
    switch (this.exoplanet.disc_facility) {
      case "KELT-North":
          this.formattedDiscFacility = "KELT-North600x307";
          break;
      case "SuperWASP-North":
          this.formattedDiscFacility = "super-wasp-n600x307";
          break;
      case "KELT-South":
          this.formattedDiscFacility = "KELT-South600x307";
          break;
      case "WASP-South":
          this.formattedDiscFacility = "image_SuperWASP";
          break;
      case "SuperWASP-South":
          this.formattedDiscFacility = "image_SuperWASP";
          break;
      case "Calar Alto Observatory":
          this.formattedDiscFacility = "Calar_alto_600x307";
          break;
      case "Transiting Exoplanet Survey Satellite (TESS)":
          this.formattedDiscFacility = "image_TESS_TransitingExoplanetSurveySatellite";
          break;
      case "KOINet":
          this.formattedDiscFacility = "KOINet600x307";
          break;
      case "Acton Sky Portal Observatory":
          this.formattedDiscFacility = "Acton_generic600x307";
          break;
      case "Mauna Kea Observatory":
          this.formattedDiscFacility = "ukirt_600x307";
          break;
      case "Large Binocular Telescope Observatory":
          this.formattedDiscFacility = "lbt600x307";
          break;
      case "KMTNet":
          this.formattedDiscFacility = "KMTNet600x307";
          break;
      case "Apache Point Observatory":
          this.formattedDiscFacility = "Apache_point600x307";
          break;
      default:
          this.formattedDiscFacility = "image_" + this.exoplanet.disc_facility.replace(/ /g, "").replace(/\./g, "_").replace(/-/g, "_");
    } 
}

  public methodDict = {
    'Transit Timing Variations': 'This method searches for regular modulations of the brightness of a star due to distortions in its shape from a massive exoplanet on a close-in orbit. Such planets can cause slight tidal distortions to their host stars, giving them as slightly ellipsoidal (stretched) shape and causing changes in apparent brightness, depending on whether the wider or narrower face of the star is oriented toward the observer.',
    'Radial Velocity': 'The radial velocity method measures slight changes in a star\'s velocity as the star and the planet move about their common center of mass. Astronomers can detect these variances by analyzing the spectrum of starlight. In an effect known as Doppler shift, light waves from a star moving toward us are shifted toward the blue end of the spectrum. If the star is moving away, the light waves shift toward the red end of the spectrum. This happens because the waves become compressed when the star is approaching the observer and spread out when the star is receding. The effect is similar to the change in pitch we hear in a train\'s whistle as it approaches and passes.',
    'Transit': 'If a planet passes directly between a star and an observer\'s line of sight, it blocks out a tiny portion of the star\'s light, thus reducing its apparent brightness. Sensitive instruments can detect this periodic dip in brightness. From the period and depth of the transits, the orbit and size of the planetary companions can be calculated. Smaller planets will produce a smaller effect, and vice-versa. A terrestrial planet in an Earth-like orbit, for example, would produce a minute dip in stellar brightness that would last just a few hours.',
    'Orbital Brightness Modulation': 'This method searches for regular modulations of the brightness of a star due to distortions in its shape from a massive exoplanet on a close-in orbit. Such planets can cause slight tidal distortions to their host stars, giving them as slightly ellipsoidal (stretched) shape and causing changes in apparent brightness, depending on whether the wider or narrower face of the star is oriented toward the observer.',
    'Disk Kinematics': 'This method is used to detect exoplanets by observing the motion of material in a protoplanetary disk, which is the disk of gas and dust that surrounds a young star. The method is based on the fact that a planet in orbit around a star will cause the material in the disk to move in a way that can be detected through observation. This movement can be in the form of spiral arms, gaps, or other structures in the disk. By studying these structures, scientists can infer the presence of a planet and potentially even determine its properties, such as its mass and orbital distance.',
    'Eclipse Timing Variations': 'Eclipse timing variations is a method for inferring the existence and properties of an exoplanet in an eclipsing binary star system by detecting the gravitational effects of the planet on the orbit of the binary pair.',
    'Pulsation Timing Variations': 'Pulsar Timing is a method used to detect the first confirmed exoplanets, which orbit a rapidly rotating neutron star known as a pulsar. As they rotate, pulsars emit intense electromagnetic radiation that is detected on Earth as regular and precisely timed pulses. Small yet consistent variations in the timing of the pulses indicate that the pulsar is wobbling back and forth, orbiting the center of mass of a system with one or more planets. By precisely measuring irregularities in the timing of the pulsars, astronomers can determine both the orbit as well as the mass of the planets.',
    'Astrometry': 'The orbit of a planet can cause a star to move around in space a small amount in relation to nearby stars in the sky, and the observation of this effect is known as astrometry. Accurately detecting the wobble caused by the gravitational pull of planets, especially small ones the size of Earth, is extremely difficult. Scientists must take a series of images of a star and some of the other stars that are near it in the sky. In each picture, they compare the distances between these reference stars and the target star. Astrometry requires extremely precise optics, and is especially hard to do from the Earth\'s surface because our atmosphere distorts and bends light.',
    'Imaging': 'Taking actual pictures of exoplanets is extremely difficult due to how much brighter a star is than its planet. However, specialized optics and clever observation methods have made a handful of exoplanet images possible, with the potential for many more to be made in the future. One method of direct imaging, coronography, uses a special masking device to block out the light of a star so that the planets orbiting it can be seen more clearly. A similar method involves the deployment of a giant starshade to block a star\'s glare, precisely positioned in space in between a nearby telescope and a star that hosts an exoplanetary system.',
    'Microlensing': 'This method derives from one of the insights of Einstein\'s theory of general relativity: gravity bends space. We normally think of light as traveling in a straight line, but light rays become bent when passing through space that is warped by the presence of a massive object such as a star. This effect has been proven by observations of the Sun\'s gravitational effect on starlight. When a planet happens to pass in front of a star along our line of sight, the planet\'s gravity will behave like a lens. This focuses the light rays and causes a temporary sharp increase in brightness and change of the apparent position of the star. Astronomers can use the gravitational microlensing effect to find objects that emit no light or are otherwise undetectable.',
    'Pulsar Timing': 'Pulsar Timing is a method used to detect the first confirmed exoplanets, which orbit a rapidly rotating neutron star known as a pulsar. As they rotate, pulsars emit intense electromagnetic radiation that is detected on Earth as regular and precisely timed pulses. Small yet consistent variations in the timing of the pulses indicate that the pulsar is wobbling back and forth, orbiting the center of mass of a system with one or more planets. By precisely measuring irregularities in the timing of the pulsars, astronomers can determine both the orbit as well as the mass of the planets.'
  };
}
