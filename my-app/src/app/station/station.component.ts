import { Component, OnInit } from '@angular/core';

import { Stationdata } from '../interfaces'
import { StationService } from "../station.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  stationdata:Stationdata = {id:249169, geolocation:"1", date:"2022-06-19T00:00:00+00:00", time:"1970-01-01T12:24:23+00:00", temperature:"10.6", wind_speed:11.2, wind_direction:227, rain:0.07}
  private stationService:StationService = new StationService()

  constructor() {

  }

  ngOnInit(): void {
    this.stationService.stationdata$.subscribe(data => {
      if (data != undefined) {
        console.log(data)
        this.station*data = data
      } else {
        this.stationService.setWeatherData(1)
      }
    })
  }

}
