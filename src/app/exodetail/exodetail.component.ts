import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InputbarComponent } from '../inputbar/inputbar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from '../loading.service'

@Component({
  selector: 'app-exodetail',
  templateUrl: './exodetail.component.html',
  styleUrls: ['./exodetail.component.css']
})
export class ExodetailComponent implements OnInit {
  @ViewChild('refContainer', { static: true, read: ElementRef }) anchorContainer: ElementRef;
  @ViewChild('iframe', { static: true }) iframe: ElementRef;

  @Input() exoplanet!: any;
 
  public imgError: boolean = false;
  public formattedDiscFacility;
  public href;
  public iframeSrc;
  public rastr_h: Number;
  public rastr_m: Number;
  public rastr_s: Number;
  public decstr_d: Number;
  public decstr_m: Number;
  public decstr_s: Number;
  
  constructor(public inputbar: InputbarComponent, private sanitizer: DomSanitizer, public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.formatDiscFacility(); 
    // Split Ra and Dec sexigesimal values up
    [this.decstr_d, this.decstr_m, this.decstr_s] = this.exoplanet.decstr.split(/[dms]/).map(x => Number(x));
    [this.rastr_h, this.rastr_m, this.rastr_s] = this.exoplanet.rastr.split(/[hms]/).map(x => Number(x));
    // Pull link/href from disc_refname anchor element
    this.anchorContainer.nativeElement.innerHTML = this.exoplanet.disc_refname;
    var anchor = this.anchorContainer.nativeElement.querySelector('a');
    this.href = anchor.getAttribute('href');
    // Local HTML file loaded during development
    //this.iframeSrc = `../assets/aladin.html?ra=${this.exoplanet.ra}&dec=${this.exoplanet.dec}&name=${this.exoplanet.hostname}&st_spectype=${this.exoplanet.st_spectype}`
    this.iframeSrc = `https://jarvisar.github.io/senior-design/assets/aladin.html?ra=${this.exoplanet.ra}&dec=${this.exoplanet.dec}&name=${this.exoplanet.hostname}&st_spectype=${this.exoplanet.st_spectype}`
    console.log(this.iframeSrc);
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

  openSkyMap(){
    window.open('http://sky-map.org/?ra=' + this.rastr_h + " " + this.rastr_m + " " + this.rastr_s + '&de=' + this.decstr_d+  " " + this.decstr_m + " " + this.decstr_s + '&show_grid=1&img_source=DSS2&show_box=1&zoom=8&box_color=white&box_width=30&box_height=30&show_stars=1');
  }

  makeFullscreen() {
    this.iframe.nativeElement.requestFullscreen();
  }

  async searchHost(event: Event){
    this.setValues();
    this.inputbar.selectedHost = this.exoplanet.hostname;
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

  // Set select elements based on search
  setValues(host = 0, method = 0, year = 0, facility = 0){
    if (host == 0){
      this.inputbar.selectedHost = '';
    }
    this.inputbar.selectedMethod = method;
    this.inputbar.selectedYear = year;
    this.inputbar.selectedFacility = facility;
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
    'Transit Timing Variations': 'This method detects exoplanets by searching for variations in a star\'s brightness caused by the planet\'s gravitational effect on the star\'s shape. The method is used to detect close-in exoplanets that cause the star to appear slightly elongated, causing changes in brightness as the wider and narrower parts of the star face the observer.',
    'Radial Velocity': 'The radial velocity method detects exoplanets by measuring changes in a star\'s movement caused by the planet\'s orbit. Astronomers can detect these changes by analyzing the star\'s spectrum, which will be shifted towards blue if the star is moving towards us and towards red if it is moving away. This is known as the Doppler shift, and is similar to the change in pitch we hear when a train is approaching and passing by.',
    'Transit': 'The transit method detects exoplanets by measuring the dip in brightness of a star when a planet passes in front of it. The period and depth of these transits can be used to calculate the orbit and size of the planet. The effect is larger for bigger planets, and smaller for smaller planets.',
    'Orbital Brightness Modulation': 'This method searches for regular modulations of the brightness of a star due to distortions in its shape from a massive exoplanet on a close-in orbit. Such planets can cause slight tidal distortions to their host stars, giving them as slightly ellipsoidal (stretched) shape and causing changes in apparent brightness, depending on whether the wider or narrower face of the star is oriented toward the observer.',
    'Disk Kinematics': 'This method detects exoplanets by observing the motion of material in a disk around a young star, caused by the planet\'s gravity. This motion can be detected as structures such as spiral arms or gaps in the disk, and can be used to infer the presence and properties of the exoplanet.',
    'Eclipse Timing Variations': 'Eclipse timing variations is a method for inferring the existence and properties of an exoplanet in an eclipsing binary star system by detecting the gravitational effects of the planet on the orbit of the binary pair.',
    'Pulsation Timing Variations': 'Pulsar Timing is a method used to detect the first confirmed exoplanets, which orbit a rapidly rotating neutron star known as a pulsar. As they rotate, pulsars emit intense electromagnetic radiation that is detected on Earth as regular and precisely timed pulses. Small yet consistent variations in the timing of the pulses indicate that the pulsar is wobbling back and forth, orbiting the center of mass of a system with one or more planets. By precisely measuring irregularities in the timing of the pulsars, astronomers can determine both the orbit as well as the mass of the planets.',
    'Astrometry': 'Astrometry is the observation of the small movement of a star caused by the orbit of a planet, which is detected by comparing the distances between the target star and nearby reference stars in a series of images. It is a difficult technique that requires precise optics and is challenging to perform from the Earth\'s surface due to atmospheric distortion.',
    'Imaging': 'Exoplanet imaging is the process of capturing an image of a planet that orbits a star outside of our solar system. It is extremely difficult due to the brightness of the star compared to its planet. However, advances in optics and observation techniques have made a few images possible, such as using coronography and starshades to block the star\'s glare and make the planet more visible.',
    'Microlensing': 'Microlensing is a method for detecting objects that emit no light or are otherwise undetectable. It is based on the insight from Einstein\'s theory of general relativity that gravity bends light. When a planet passes in front of a star along our line of sight, the planet\'s gravity acts like a lens and focuses the light, causing a temporary increase in brightness and change in the apparent position of the star. This effect can be used by astronomers to find otherwise undetectable objects.',
    'Pulsar Timing': 'Pulsar Timing is a method used to detect the first confirmed exoplanets, which orbit a rapidly rotating neutron star known as a pulsar. As they rotate, pulsars emit intense electromagnetic radiation that is detected on Earth as regular and precisely timed pulses. Small yet consistent variations in the timing of the pulses indicate that the pulsar is wobbling back and forth, orbiting the center of mass of a system with one or more planets. By precisely measuring irregularities in the timing of the pulsars, astronomers can determine both the orbit as well as the mass of the planets.'
  };
}
