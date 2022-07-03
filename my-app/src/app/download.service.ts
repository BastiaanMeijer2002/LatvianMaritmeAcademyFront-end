import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  data:any

  constructor() { }

  downloadJson(data:any) {
    this.data = data;
    data = JSON.stringify(this.data)

    let xml = this.OBJtoXML(JSON.parse(data))

    const filename = "file.xml";
    const pom = document.createElement('a');
    const blob = new Blob([xml], { type: 'text/plain' });

    pom.setAttribute('href', window.URL.createObjectURL(blob));
    pom.setAttribute('download', filename);

    pom.dataset['downloadurl'] = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true;
    pom.classList.add('dragout');

    pom.click()
  }

  OBJtoXML(obj:any) {
    let xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += this.OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += this.OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }
}
