import { Injectable } from '@angular/core';

import {geolocationPlace, Stationdata, StationdataSimple} from "./interfaces";
import {BehaviorSubject, catchError, Observable, retry, throwError} from "rxjs";
import {SecurityService} from "./security.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  token = localStorage.getItem('jwt');
  authCode = `Bearer ${this.token}`;

  constructor(private http: HttpClient) {

  }

  getGeolocationPlace(): Observable<geolocationPlace|undefined>{
    return this.geolocationPlace$.asObservable()
  }

  setGeolocationPlace(id: number): void {
    let token = localStorage.getItem('jwt')
    let authCode = `Bearer ${token}`

    fetch(`http://localhost:8000/api/geolocation/info/place/${id}`, {headers:{'Authorization': authCode}}).then(res => {
      return res.json()
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
      return res.json();
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
        return res.json();
      })
        .then(res => {
        if (res != undefined) {
          this.stationdataSet = res
          this.stationdataSet$.next(this.stationdataSet)
          console.log(this.stationdataSet)
        }
      })
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authCode
    })
  }

  getHistoricalData(id:string, date:string): Observable<Stationdata>{
    return this.http
      .get<Stationdata>(`http://localhost:8000/api/historical/${id}/${date}`, {
        headers: {
          'Authorization': this.authCode,
          'Content-Type': 'application/json'
        }
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getData(id:string): Observable<Stationdata>{
    return this.http
      .get<Stationdata>(`http://localhost:8000/api/live/${id}`, {
        headers: {
          'Authorization': this.authCode,
          'Content-Type': 'application/json'
        }
      })
      .pipe(retry(2), catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });

  }

}
