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
  stationdata?:Stationdata
  wind_speed:String = "loading.."
  wind_direction:String = "loading.."
  rain:String = "loading.."
  place:String ='loading..'
  country:String='location..'
  private stationService:StationService = new StationService()
  private downloadUrl: SafeUrl | undefined;

  constructor(private route:ActivatedRoute, private sanitizer: DomSanitizer, private securityService: SecurityService) {
  }

  ngOnInit(){
    this.securityService.checkAuthStatus();
    const downloadButton = document.querySelector('#downloadButton')

    this.id = this.route.snapshot.params['id'];
    console.log(this.id)

    this.stationService.stationdata$.subscribe(data => {
      if (data != undefined) {
        console.log(data)
        this.stationdata = data
        this.wind_speed = ''+data.wind_speed
        this.wind_direction = ''+data.wind_direction
        this.rain = ''+data.rain
      } else {
        this.stationService.setWeatherData(parseInt(this.id))
      }
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

  downloadJson() {
    let data = JSON.stringify(this.stationdata)
    let url = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(data))
    this.downloadUrl = url
  }
}
