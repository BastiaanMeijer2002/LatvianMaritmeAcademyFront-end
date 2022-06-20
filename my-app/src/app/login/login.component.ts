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
    this.loginService.checkLogin(this.loginData)

    const loginButton = document.querySelector('loginButton')

    loginButton?.addEventListener("click", this.loginEvent)


  }

  loginEvent() {
    var object = {};
    let data = new FormData(document.querySelector('form') as HTMLFormElement)
    let dataSend = JSON.stringify(Object.fromEntries(data as any))

    fetch('http://localhost:8000/api/login_check',
      {method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: dataSend
      })
      .then(resp => resp.json())
      .then(json => {
        localStorage.setItem('jwt', json.token)
        window.location.replace('index.html')
      })
  }
}
