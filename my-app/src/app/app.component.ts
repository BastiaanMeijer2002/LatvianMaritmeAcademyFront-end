import {Component, ElementRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SwUpdate} from "@angular/service-worker";

// import {map, startWith} from 'rxjs/operators';
// import {Observable} from "rxjs";
//
// const CACHE_KEY = 'httRepoCache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  // public repos: Observable<any>;

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

  // constructor(http: HttpClient) {
  //   const path = 'https://api.github.com/search/repositories?q=angular';
  //   this.repos = http.get<any>(path)
  //     .pipe(
  //       map(data => data.items)
  //     );
  //   this.repos.subscribe(next => {
  //     localStorage[CACHE_KEY] = JSON.stringify(next);
  //   });
  //
  //   this.repos = this.repos.pipe(
  //     startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
  //   )
  // }
  update: boolean = false;
  constructor(updates: SwUpdate) {
    updates.available.subscribe(event =>{
      updates.activateUpdate().then(() => document.location.reload());
    })
  }
}
