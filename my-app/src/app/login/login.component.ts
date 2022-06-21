import { Component, OnInit } from '@angular/core';
import {loginService} from "../login.service";
import { loginData } from "../interfaces";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginService:loginService = new loginService()
  private loginData:loginData = {username:"test@test.nl", password:"1234"}

  constructor() { }

  ngOnInit(): void {
    const loginButton = document.querySelector('#loginButton')

    loginButton?.addEventListener("click", btn => {
      btn.preventDefault()
      this.loginEvent()
    })
  }

  loginEvent() {
    console.log("click")
    let data = new FormData(document.querySelector('form') as HTMLFormElement)
    let dataSend = JSON.stringify(Object.fromEntries(data as any))

    console.log(dataSend)
    this.loginService.checkLogin(dataSend)
    window.location.replace('/search')
  }
}
