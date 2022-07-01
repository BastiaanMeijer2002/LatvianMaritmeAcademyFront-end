import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private router: Router) { }

  checkAuthStatus(){
    let token = localStorage.getItem('jwt')
    let jwtHelper = new JwtHelperService();

    if (!token){
      return this.router.navigate(['authorization-failed']);
    } else if (jwtHelper.isTokenExpired(token)){
      localStorage.removeItem(token);
      return this.router.navigate(['authorization-failed']);
    }

    return;
  }
}
