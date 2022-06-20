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

  checkLogin(body:any) {

    fetch('http://localhost:8000/api/login_check',
      {method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
      })
      .then(resp => resp.json())
      .then(json => {
        localStorage.setItem('jwt', json.token)
      })
  }
}

