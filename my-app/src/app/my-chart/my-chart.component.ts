import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Current data',
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: [
            'blue'
          ],
          borderColor: [
            'red'
          ],
          borderWidth: 1
        },{
          label: 'Las week data',
          data: [14, 15, 7, 2, 9, 4, 8],
          backgroundColor: [
            'red'
          ],
          borderColor: [
            'blue'
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
  }

}
