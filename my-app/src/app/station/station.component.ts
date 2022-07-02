import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Stationdata } from '../interfaces'
import { StationService } from "../station.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SecurityService} from "../security.service";

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
  private downloadUrl: SafeUrl | undefined;

  constructor(private route:ActivatedRoute, private sanitizer: DomSanitizer, private securityService: SecurityService, private router: Router, private stationService: StationService) {
  }

  ngOnInit() {
    this.securityService.checkAuthStatus();
    const downloadButton = document.querySelector('#downloadButton')

    this.id = this.route.snapshot.params['id'];
    this.state = this.route.snapshot.params['state'];
    console.log(this.state)

    this.getData();
  }

  downloadJson() {
    let data = JSON.stringify(this.stationdata)
    let url = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(data))
    this.downloadUrl = url
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
      })

    this.stationService.geolocationPlace$.subscribe(r => {
      if (r != undefined) {
        this.country = r.country
        this.place = r.place
      } else {
        this.stationService.setGeolocationPlace(parseInt(this.id))
      }
    })
  }
}
