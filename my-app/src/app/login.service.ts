import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { loginData } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class loginService {
  private jwt?: String
  public jwt$ = new BehaviorSubject<String|undefined>(this.jwt)

  constructor() {

  }

  checkLogin(_loginData: loginData) {
    let dataSend = JSON.stringify(_loginData)

    fetch('http://localhost:8000/api/login_check',
      {method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: dataSend
      })
      .then(resp => console.log(resp))

    return _loginData
  }
}

