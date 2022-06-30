import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import Chart from 'chart.js/auto'

import { StationService,  } from "../station.service";
import {Stationdata, StationdataSimple} from "../interfaces";

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {
  id = ""
  stationdata?:Stationdata
  stationdataSet?:StationdataSimple[]
  labels:string[] = []
  rainChartData:number[] = []
  windChartData:number[] = []

  private stationService:StationService = new StationService()

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.stationService.stationdata$.subscribe(data => {
      if (data != undefined) {
        console.log(data)
        this.stationdata = data
        // @ts-ignore
        document.getElementById('arrowfront').style.transform = `rotate(${data.wind_direction+90}deg)`
      } else {
        this.stationService.setWeatherData(parseInt(this.id))
      }
    })

    this.stationService.stationdataSet$.subscribe(data => {
      if (data != undefined) {
        this.stationdataSet = data
        this.labels = []

        this.rainChartData = []
        this.windChartData = []
        this.stationdataSet.forEach(stationdata => {
          this.labels.push(stationdata.date)
          this.rainChartData.push(stationdata.rainfall)
          this.windChartData.push(stationdata.wind_speed)
        })

        rainChart.data.labels = this.labels
        rainChart.data.datasets[0].data = this.rainChartData
        rainChart.update()

        windChart.data.labels = this.labels
        windChart.data.datasets[0].data = this.windChartData
        windChart.update()
      } else {
        this.stationService.setWeatherDataSet(parseInt(this.id), 7)
      }
    })

    const rainChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Current data',
          data: this.rainChartData,
          backgroundColor: [
            'rgba(0, 0, 255, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 255, 1)'
          ],
          borderWidth: 1
        },]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const windChart = new Chart("myChartBar", {
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
        },]
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
