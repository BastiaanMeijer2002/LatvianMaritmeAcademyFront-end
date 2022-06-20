import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

import { StationService } from "../station.service";

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {
  private stationService:StationService = new StationService()

  constructor() { }

  ngOnInit() {
    this.stationService.setWeatherDataSet(1)
    this.stationService.stationdataSet$.subscribe(data => {
      if (data != undefined) {
        console.log(data)
      } else {
        this.stationService.setWeatherDataSet(1)
      }
    })

    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Current data',
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: [
            'rgba(0, 0, 255, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 255, 1)'
          ],
          borderWidth: 1
        },{
          label: 'Las week data',
          data: [14, 15, 7, 2, 9, 4, 8],
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(255, 0, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const myChartBar = new Chart("myChartBar", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Current data',
          data: [3, 22, 13, 6, 3, 3, 9],
          backgroundColor: [
            'rgba(222, 104, 247, 0.2)'
          ],
          borderColor: [
            'rgba(222, 104, 247, 1)'
          ],
          borderWidth: 1
        },{
          label: 'Las week data',
          data: [1, 11, 17, 22, 19, 9, 3],
          backgroundColor: [
            'rgba(104, 247, 135, 0.2)'
          ],
          borderColor: [
            'rgba(104, 247, 135, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // const myChartRadar = new Chart("myChartRadar", {
    //   type: 'radar',
    //   data: {
    //     labels: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
    //     datasets: [{
    //       label: 'Current data',
    //       data: [11, 22, 33, 16, 23, 13, 19, 25, 17, 24, 11, 25, 12, 21, 32, 11],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)'
    //       ],
    //       borderWidth: 1
    //     },{
    //       label: 'Las week data',
    //       data: [21, 12, 13, 36, 13, 23, 9, 15, 7, 14, 21, 15, 2, 11, 22, 1],
    //       backgroundColor: [
    //         'rgba(75, 192, 192, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(75, 192, 192, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }
}
