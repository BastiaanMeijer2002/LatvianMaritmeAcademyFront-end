import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const loginButton = document.querySelector('loginButton')

    loginButton?.addEventListener("click", this.loginEvent)

  }

  loginEvent() {
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
