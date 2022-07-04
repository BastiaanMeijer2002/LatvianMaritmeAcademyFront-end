import {Component, ElementRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SwUpdate} from "@angular/service-worker";
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SecurityService} from "./security.service";

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
    const logoutButton = document.getElementById('#logoutButton');
   console.log(this.isAuthorized());

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


  update: boolean = false;
  constructor(updates: SwUpdate , private route: Router, private securityService: SecurityService) {
    updates.available.subscribe(event =>{
      updates.activateUpdate().then(() => document.location.reload());


    })
  }

  isAuthorized(){
    return this.securityService.getAuthStatus();
  }

  isInitialized(){
    let data = localStorage.getItem('stationdata')
    if (data) {
      return true
    }
    return false
  }
}
