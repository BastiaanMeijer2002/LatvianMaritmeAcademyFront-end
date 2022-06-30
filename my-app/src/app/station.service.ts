import { Injectable } from '@angular/core';

import {geolocationPlace, Stationdata, StationdataSimple} from "./interfaces";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stationdata?:Stationdata
  stationdataSet?:StationdataSimple[]
  geolocationPlace?:geolocationPlace

  public stationdata$ = new BehaviorSubject<Stationdata|undefined>(this.stationdata)
  public stationdataSet$ = new BehaviorSubject<StationdataSimple[]|undefined>(this.stationdataSet)
  public geolocationPlace$ = new BehaviorSubject(<geolocationPlace|undefined>(this.geolocationPlace))

  constructor() {

  }

  getGeolocationPlace(): Observable<geolocationPlace|undefined>{
    return this.geolocationPlace$.asObservable()
  }

  setGeolocationPlace(id: number): void {
    let token = localStorage.getItem('jwt')
    let authCode = `Bearer ${token}`

    fetch(`http://localhost:8000/api/geolocation/info/place/${id}`, {headers:{'Authorization': authCode}}).then(res => {
      if (res.status === 401) {
        console.log('JWT verlopen/niet aanwezig')
        localStorage.removeItem('jwt')
        window.location.href = '/login'
        alert('Session expired.')
        return
      } else {
        return res.json()
      }
    }).then(r => {
      this.geolocationPlace = {place: r['place'], country: r['country']}
    }).then(r => this.geolocationPlace$.next(this.geolocationPlace))

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
        alert('Session expired.')
        return
      } else {
        return res.json()
      }
    }).then(res => {
      this.stationdata = {id:res.id, geolocation:res.geolocation, date:res.date, time:res.time, temperature:res.temperature, wind_speed:res['wind-speed'], wind_direction:res['wind-direction'], rain:res.rain}
    }).then(res => this.stationdata$.next(this.stationdata))
  }

  getWeatherDataSet(): Observable<StationdataSimple[]|undefined> {
    return this.stationdataSet$.asObservable()
  }

  setWeatherDataSet(id:number, days:number): void {
    let token = localStorage.getItem('jwt')
    let authCode = `Bearer ${token}`
      fetch("http://localhost:8000/api/analytics/days/"+id+"/"+days,{headers:{'Authorization': authCode}}).then(res => {
        if (res.status === 401) {
          console.log('JWT verlopen/niet aanwezig')
          localStorage.removeItem('jwt')
          window.location.href = '/login'
          alert('Session expired.')
          return
        } else {
          return res.json() as unknown as StationdataSimple[]
        }
      }).then(res => {
        if (res != undefined) {
          this.stationdataSet = res
          this.stationdataSet$.next(this.stationdataSet)
          console.log(this.stationdataSet)
        }
      })
  }


}
