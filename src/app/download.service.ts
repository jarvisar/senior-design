import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  // Download search results as CSV file
  downloadFile(data, filename='data') {
    // List which columns to export
    let csvData = this.ConvertToCSV(data, ['pl_name','hostname', 'discoverymethod', 'disc_year', 'disc_facility', 'disc_refname', 'pl_controv_flag', 'sy_snum', 'sy_pnum', 
    'sy_mnum', 'st_spectype', 'cb_flag', 'rastr', 'decstr', 'ra', 'dec', 'pl_orbper', 'pl_orbsmax', 'pl_orbeccen', 'pl_rade', 'pl_bmasse', 'pl_dens', 'sy_dist']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  // Converts JSON to CSV
  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'No.';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1)+'';
        for (let index in headerList) {
           let head = headerList[index];

            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
  }
  
  constructor() { }
}
