import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  ngOnInit() {
    const logoutButton = document.querySelector('#logoutButton')

    logoutButton?.addEventListener("click", btn => {
      btn.preventDefault()
      this.logoutEvent()
    })

  }

  logoutEvent() {
    localStorage.removeItem('jwt')
  }
}
