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
    return
  }
}

