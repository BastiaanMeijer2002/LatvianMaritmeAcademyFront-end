import {Injectable} from '@angular/core';
import {geolocationPlace, statistics} from "./interfaces";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  apiUrl = 'http://localhost:8000/api';
  token = localStorage.getItem('jwt');
  authCode = `Bearer ${this.token}`;

  constructor(private http: HttpClient, private securityService: SecurityService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authCode
    })
  }

  getStatistics(measurement_unit: string,
                order: string,
                date_start: string,
                date_end: string,
                amount: string,
                country:any
  ): Observable<statistics> {

    return this.http
      .get<statistics>(this.apiUrl + `/statistics/${measurement_unit}/${order}/${date_start}/${date_end}/${amount}/${country}`, {
        headers: {
          'Authorization': this.authCode,
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      })
      .pipe(retry(2), catchError(this.handleError));


  }

  getGeolocationPlace(id: string){
    return this.http
      .get<geolocationPlace>(this.apiUrl + `/geolocation/info/${id}`, {
        headers: {
          'Authorization': this.authCode,
          'Content-Type': 'application/json'
        }
      })
      .pipe(retry(2), catchError(this.handleError));
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
