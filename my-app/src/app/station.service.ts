import { Injectable } from '@angular/core';

import {Stationdata} from "./interfaces";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stationdata?:Stationdata
  stationdataSet?:Stationdata[]

  public stationdata$ = new BehaviorSubject<Stationdata|undefined>(this.stationdata)
  public stationdataSet$ = new BehaviorSubject<Stationdata[]|undefined>(this.stationdataSet)

  constructor() {

  }

  getWeatherData(): Observable<Stationdata|undefined> {
    return this.stationdata$.asObservable()
  }

  setWeatherData(id:number): void {
    let token = localStorage.getItem('jwt')
    let authCode = `Bearer ${token}`

    fetch("http://localhost:8000/api/live/" + id, {headers:{'Authorization': authCode}}).then(res => res.json()).then(res => {
      this.stationdata = {id:res.id, geolocation:res.geolocation, date:res.date, time:res.time, temperature:res.temperature, wind_speed:res['wind-speed'], wind_direction:res['wind-direction'], rain:res.rain}
    }).then(res => this.stationdata$.next(this.stationdata))
  }

  getWeatherDataSet(): Observable<Stationdata[]|undefined> {
    return this.stationdataSet$.asObservable()
  }

  setWeatherDataSet(id:number): Date[] {
    let dates:Date[] = []
    const date = new Date()
    for (let i = 0; i < 7; i++) {
      let newdate = new Date()
      newdate.setDate(date.getDate() - i)
      dates.push(newdate)
    }
    return dates
  }


}
