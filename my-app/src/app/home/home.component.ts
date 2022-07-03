import { Component, OnInit } from '@angular/core';
import { SecurityService} from "../security.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  isAuthorized(){
    return this.securityService.getAuthStatus();
  }

}
