import { Component, OnInit } from '@angular/core';

import { Stationdata } from '../interfaces'
import { StationService } from "../station.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  stationdata?:Stationdata
  wind_speed:String = "loading.."
  wind_direction:String = "loading.."
  rain:String = "loading.."
  private stationService:StationService = new StationService()

  constructor() {

  }

  ngOnInit(): void {
    this.stationService.stationdata$.subscribe(data => {
      if (data != undefined) {
        console.log(data)
        this.stationdata = data
        this.wind_speed = ''+data.wind_speed
        this.wind_direction = ''+data.wind_direction
        this.rain = ''+data.rain
      } else {
        this.stationService.setWeatherData(1)
      }
    })
  }

}
