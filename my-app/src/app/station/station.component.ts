import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Stationdata } from '../interfaces'
import { StationService } from "../station.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SecurityService} from "../security.service";
import {DownloadService} from "../download.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  id = '';
  state = 'live';
  stationdata?:Stationdata
  wind_speed:String = "loading.."
  wind_direction:String = "loading.."
  rain:String = "loading.."
  place:String ='loading..'
  country:String='location..'
  date:String='loading..'
  time:String='loading..'
  data: any;
  stationCompareID:any;
  private downloadUrl: SafeUrl | undefined;

  constructor(private route:ActivatedRoute, private sanitizer: DomSanitizer, private securityService: SecurityService, private router: Router, private stationService: StationService, private downloadService: DownloadService) {
  }

  ngOnInit() {
    this.securityService.checkAuthStatus();

    this.id = this.route.snapshot.params['id'];
    this.state = this.route.snapshot.params['state'];
    console.log(this.state)

    if (this.state == 'stored') {
      let data = localStorage.getItem('stationdata')
      if (data) {
        this.data = JSON.parse(data)
        this.country = localStorage.getItem('country') as string
        this.place = localStorage.getItem('place') as string
        console.log(this.data)
      }
    } else {
      this.getData();
    }
  }

  downloadData(data:any){
    return this.downloadService.downloadJson(data);
  }

  getHistorical(){
    this.securityService.checkAuthStatus();
    this.state = (<HTMLInputElement>document.getElementById("historical-date")).value;
    let result = this.stationService.getHistoricalData(this.id, this.state).subscribe((data:Stationdata) => {
      this.data = data;
    });

    return this.data;
  }

  getData(){
    // this.stationService.stationdata$.subscribe(data => {
    //   if (data != undefined) {
    //     this.stationdata = data
    //     this.wind_speed = '' + data.wind_speed
    //     this.wind_direction = '' + data.wind_direction
    //     this.rain = '' + data.rain
    //     this.date = ''+data.date.slice(0,10);
    //     this.time = ''+data.date.slice(11,19);
    //
    //   } else {
    //     console.log(data)
    //     this.stationService.setWeatherData(parseInt(this.id))
    //   }
    // })
    this.securityService.checkAuthStatus();
    this.stationService.getData(this.id).subscribe((data:Stationdata) =>{
      console.log(data)
      this.data = data;
      localStorage.setItem('stationdata', JSON.stringify(this.data))
    })

    this.stationService.geolocationPlace$.subscribe(r => {
      if (r != undefined) {
        this.country = r.country
        this.place = r.place
        localStorage.setItem('country', this.country as string)
        localStorage.setItem('place', this.place as string)
      } else {
        this.stationService.setGeolocationPlace(parseInt(this.id))
      }
    })
  }

  getStationCompare(place:string, date:string) {
    this.data = this.stationService.getStationCompare(this.id, place, date);
    console.log(this.data)
  }
}
