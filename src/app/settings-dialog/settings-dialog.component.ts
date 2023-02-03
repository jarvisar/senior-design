import { Component, OnInit, Injectable, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
@Injectable()
export class SettingsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<string>,
    private dialogRef: MatDialogRef<SettingsDialogComponent>) {
    let displayedColumns = Array.from(data);
    if(displayedColumns.includes('pl_name')){
      this.pl_name = true;
    }
    if(displayedColumns.includes('hostname')){
      this.hostname = true;
    }
    if(displayedColumns.includes('discoverymethod')){
      this.discoverymethod = true;
    }
    if(displayedColumns.includes('disc_year')){
      this.disc_year = true;
    }
    if(displayedColumns.includes('disc_facility')){
      this.disc_facility = true;
    }
    if(displayedColumns.includes('pl_controv_flag')){
      this.pl_controv_flag = true;
    }
    if(displayedColumns.includes('sy_snum')){
      this.sy_snum = true;
    }
    if(displayedColumns.includes('sy_pnum')){
      this.sy_pnum = true;
    }
    if(displayedColumns.includes('sy_mnum')){
      this.sy_mnum = true;
    }
    if(displayedColumns.includes('st_spectype')){
      this.st_spectype = true;
    }
    if(displayedColumns.includes('cb_flag')){
      this.cb_flag = true;
    }
    if(displayedColumns.includes('rastr')){
      this.rastr = true;
    }
    if(displayedColumns.includes('decstr')){
      this.decstr = true;
    }
    if(displayedColumns.includes('ra')){
      this.ra = true;
    }
    if(displayedColumns.includes('dec')){
      this.dec = true;
    }
    if(displayedColumns.includes('pl_orbper')){
      this.pl_orbper = true;
    }
    if(displayedColumns.includes('pl_orbsmax')){
      this.pl_orbsmax = true;
    }
    if(displayedColumns.includes('pl_orbeccen')){
      this.pl_orbeccen = true;
    }
    if(displayedColumns.includes('pl_rade')){
      this.pl_rade = true;
    }
    if(displayedColumns.includes('pl_bmasse')){
      this.pl_bmasse = true;
    }
    if(displayedColumns.includes('pl_dens')){
      this.pl_dens = true;
    }
    if(displayedColumns.includes('sy_dist')){
      this.sy_dist = true;
    }
  }

  pl_name?: boolean; // Exoplanet name
  hostname?: boolean; // Host name (star name)
  discoverymethod?: boolean; // Discovery method
  disc_year?: boolean; // Discovery year
  disc_facility?: boolean; // Discovery facility
  pl_controv_flag?: boolean; // 1 = controversial, 0 = non-controversial
  sy_snum?: boolean; // Number of stars in system
  sy_pnum?: boolean; // Number of planets in system
  sy_mnum?: boolean; // Number of moons in system
  st_spectype?: boolean; // Spectral Type of host star
  cb_flag?: boolean; // Indicates if exoplanet orbits binary system: 1 = yes, 0 = no
  rastr?: boolean; // Right Ascension of the planetary system in sexagesimal format
  decstr?: boolean; // Declination of the planetary system in sexagesimal format
  ra?: boolean; // Right Ascension of the planetary system in decimal format
  dec?: boolean; // Declination of the planetary system in decimal format
  pl_orbper?: boolean; // Orbital period in days
  pl_orbsmax?: boolean; // Orbital radius in au
  pl_orbeccen?: boolean; // Amount by which the orbit of the planet deviates from a perfect circle (eccentricity)
  pl_rade?: boolean; // Planet radius in units of radius of the Earth
  pl_bmasse?: boolean; // Planet's Mass measured in units of masses of the Earth
  pl_dens?: boolean; // Planet density in g/cm^3
  sy_dist?: boolean; // Distance from Earth in parsecs

  displayedColumns;

  defaultSettings(){
    this.pl_name = true;
    this.hostname = true;
    this.discoverymethod = true;
    this.disc_year = true;
    this.pl_rade = true;
    this.pl_bmasse = true;
    this.pl_dens = true;
    this.disc_facility = true;
    this.pl_controv_flag = false;
    this.sy_snum = false;
    this.sy_pnum = false;
    this.sy_mnum = false;
    this.st_spectype = false;
    this.cb_flag = false;
    this.rastr = false;
    this.decstr = false;
    this.ra = false;
    this.dec = false;
    this.pl_orbper = false;
    this.pl_orbsmax = false;
    this.pl_orbeccen = false;
    this.sy_dist = false;
    this.displayedColumns = ['index', 'pl_name', 'hostname', 'discoverymethod', 'disc_year', 'pl_rade', 'pl_bmasse', 'pl_dens', 'disc_facility'];
  }

  saveSettings(){
    this.displayedColumns = ['index', 'pl_name', 'hostname'];
    if (this.discoverymethod) {
      this.displayedColumns.push('discoverymethod');
    }
    if (this.disc_year) {
      this.displayedColumns.push('disc_year');
    }
    if (this.pl_rade) {
      this.displayedColumns.push('pl_rade');
    }
    if (this.pl_bmasse) {
      this.displayedColumns.push('pl_bmasse');
    }
    if (this.pl_dens) {
      this.displayedColumns.push('pl_dens');
    }
    if (this.pl_controv_flag) {
      this.displayedColumns.push('pl_controv_flag');
    }
    if (this.sy_snum) {
      this.displayedColumns.push('sy_snum');
    }
    if (this.sy_pnum) {
      this.displayedColumns.push('sy_pnum');
    }
    if (this.sy_mnum) {
      this.displayedColumns.push('sy_mnum');
    }
    if (this.st_spectype) {
      this.displayedColumns.push('st_spectype');
    }
    if (this.cb_flag) {
      this.displayedColumns.push('cb_flag');
    }
    if (this.rastr) {
      this.displayedColumns.push('rastr');
    }
    if (this.decstr) {
      this.displayedColumns.push('decstr');
    }
    if (this.ra) {
      this.displayedColumns.push('ra');
    }
    if (this.dec) {
      this.displayedColumns.push('dec');
    }
    if (this.pl_orbper) {
      this.displayedColumns.push('pl_orbper');
    }
    if (this.pl_orbsmax) {
      this.displayedColumns.push('pl_orbsmax');
    }
    if (this.pl_orbeccen) {
      this.displayedColumns.push('pl_orbeccen');
    }
    if (this.sy_dist) {
      this.displayedColumns.push('sy_dist');
    }
    if (this.disc_facility) {
      this.displayedColumns.push('disc_facility');
    }
    this.dialogRef.close({ data: this.displayedColumns })
  }

  ngOnInit(): void {
  }

}
