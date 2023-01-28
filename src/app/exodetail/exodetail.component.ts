import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InputbarComponent } from '../inputbar/inputbar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from '../loading.service'
import { MethodboxComponent } from '../methodbox/methodbox.component';

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
  public iframeSrc;
  public rastr_h: Number;
  public rastr_m: Number;
  public rastr_s: Number;
  public decstr_d: Number;
  public decstr_m: Number;
  public decstr_s: Number;
  
  constructor(public inputbar: InputbarComponent, private sanitizer: DomSanitizer, public loadingService: LoadingService, public methodbox: MethodboxComponent) {
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

  async searchHost(event: Event){
    this.setValues();
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
}
