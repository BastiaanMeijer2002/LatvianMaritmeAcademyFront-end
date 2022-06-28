import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../statistics.service";
import {statistics} from "../interfaces";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  measurement_unit: any;
  order: any;
  date_start: any;
  date_end: any;
  amount: any;
  data: any;

  constructor(private statisticsService: StatisticsService ) { }

  ngOnInit(): void {
  }

  getStatistics() {
    this.measurement_unit = (<HTMLInputElement>document.getElementById("measurement_unit")).value;
    this.order = (<HTMLInputElement>document.getElementById("order")).value;
    this.date_start = (<HTMLInputElement>document.getElementById("date_start")).value;
    this.date_end = (<HTMLInputElement>document.getElementById("date_end")).value;
    this.amount = (<HTMLInputElement>document.getElementById("amount")).value;

    return this.statisticsService.getStatistics(this.measurement_unit,this.order,this.date_start,this.date_end,this.amount).subscribe((data: statistics) => {
      this.data = data;
    })

  }

}
