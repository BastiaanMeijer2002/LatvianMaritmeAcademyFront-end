import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  ngOnInit() {
    const logoutButton = document.querySelector('#logoutButton')

    let jwt = localStorage.getItem('jwt')
    if (jwt === undefined) {
      ElementRef

    }

    logoutButton?.addEventListener("click", btn => {
      btn.preventDefault()
      this.logoutEvent()
    })

  }

  logoutEvent() {
    localStorage.removeItem('jwt')
    window.location.replace('/login')
    window.alert("you have been successfully logged out")
  }
}
