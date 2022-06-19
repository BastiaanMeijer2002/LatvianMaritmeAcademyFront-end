import { Injectable } from '@angular/core';

import {Stationdata} from "./interfaces";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stationdata?:Stationdata

  public stationdata$ = new BehaviorSubject<Stationdata|undefined>(this.stationdata)

  constructor() {
  }

  getWeatherData(): void {
    fetch("http://localhost:8000/live/1").then(res => res.json()).then(res => {
      console.log(res)
      this.stationdata = {id:res.id, geolocation:res.geolocation, date:res.date, time:res.time, temperature:res.temperature, wind_speed:res.wind_speed, wind_direction:res.wind_direction, rain:res.rain}
    }).then(res => this.stationdata$.next(this.stationdata))
  }

}
