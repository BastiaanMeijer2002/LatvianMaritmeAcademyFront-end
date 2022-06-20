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

    fetch("http://localhost:8000/api/live/" + id, {headers:{'Authorization': authCode}}).then(res => {
      if (res.status === 401) {
        console.log('JWT verlopen/niet aanwezig')
        localStorage.removeItem('jwt')
        window.location.href = '/login'
        return
      } else {
        return res.json()
      }
    }).then(res => {
      this.stationdata = {id:res.id, geolocation:res.geolocation, date:res.date, time:res.time, temperature:res.temperature, wind_speed:res['wind-speed'], wind_direction:res['wind-direction'], rain:res.rain}
    }).then(res => this.stationdata$.next(this.stationdata))
  }

  getWeatherDataSet(): Observable<Stationdata[]|undefined> {
    return this.stationdataSet$.asObservable()
  }

  setWeatherDataSet(id:number): void {
    let dates:String[] = []
    const curdate = new Date()
    for (let i = 0; i < 7; i++) {
      let newdate = new Date()
      newdate.setDate(curdate.getDate() - i)
      dates.push(newdate.getDate()+'-'+(newdate.getMonth()+1)+'-'+newdate.getFullYear())
    }

    let token = localStorage.getItem('jwt')
    let authCode = `Bearer ${token}`
    let result:Stationdata[] = []
    for (let date of dates) {
      fetch("http://localhost:8000/api/historical/"+id+"/"+date,{headers:{'Authorization': authCode}}).then(res => {
        if (res.status === 401) {
          console.log('JWT verlopen/niet aanwezig')
          localStorage.removeItem('jwt')
          window.location.href = '/login'
          return
        } else {
          return res.json()
        }
      }).then(res => {
        console.log(res)

        let rainavg:number = 0
        for (let i=0; i < res.length; i++) {
          rainavg += <number>res[i].rainfall
        }
        if (rainavg === 0) {
          rainavg = 0
        } else {
          rainavg = rainavg / res.length
        }

        let wind_speedavg = 0
        for (let i=0; i < res.length; i++) {
          wind_speedavg += <number>res[i].windSpeed
        }
        if (wind_speedavg === 0) {
          wind_speedavg = 0
        } else {
          wind_speedavg = wind_speedavg / res.length
        }

        let data = {
          id:res.id,
          geolocation:res.geolocation,
          date:date,
          time:res.time,
          temperature:res.temperature,
          wind_speed:wind_speedavg,
          wind_direction:res['wind-direction'],
          rain:rainavg}

        result.push(data)
      })
    }
    this.stationdataSet = result
    this.stationdataSet$.next(this.stationdataSet)
  }


}
