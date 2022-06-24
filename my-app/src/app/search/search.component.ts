import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }



  searchStation() {
    // @ts-ignore
    const place = document.getElementById('place').value;
    let token = localStorage.getItem('jwt')
    let authCode = `Bearer ${token}`

    console.log(place);

    fetch(`http://localhost:8000/api/geolocation/id/${place}`, {
      headers:
        {'Authorization': authCode}

    })
      .then(r => {
        return r.json()
      }).then(r => {
        this.router.navigate(['/station', r['id']]).then()
    })



  }

}
