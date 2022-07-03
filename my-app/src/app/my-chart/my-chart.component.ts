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
  state = "live";
  stationdata?:Stationdata
  stationdataSet?:StationdataSimple[]
  labels:string[] = []
  rainChartData:number[] = []
  windChartData:number[] = []


  constructor(private route:ActivatedRoute, private stationService: StationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.state = this.route.snapshot.params['state'];

    if (this.state == "stored") {
      this.getStoredData()
    } else {
      //set compass data
      this.stationService.stationdata$.subscribe(data => {
        if (data != undefined) {
          console.log(data)
          this.stationdata = data
          // @ts-ignore
          document.getElementById('arrowfront').style.transform = `rotate(${data.wind_direction + 90}deg)`
        } else {
          this.stationService.setWeatherData(parseInt(this.id))
        }
      })

      //set chart data
      this.stationService.stationdataSet$.subscribe(data => {
        if (data != undefined) {
          this.stationdataSet = data
          this.labels = []

          this.rainChartData = []
          this.windChartData = []
          this.stationdataSet.forEach(stationdata => {
            this.labels.push(stationdata.date.slice(0, 10))
            this.rainChartData.push(stationdata.rainfall)
            this.windChartData.push(stationdata.wind_speed)
          })

          rainChart.data.labels = this.labels
          rainChart.data.datasets[0].data = this.rainChartData
          rainChart.update()

          windChart.data.labels = this.labels
          windChart.data.datasets[0].data = this.windChartData
          windChart.update()

          localStorage.setItem('labels', JSON.stringify(this.labels))
          localStorage.setItem('windChartData', JSON.stringify(this.windChartData))
          localStorage.setItem('rainChartData', JSON.stringify(this.rainChartData))
        } else {
          this.stationService.setWeatherDataSet(parseInt(this.id), 7)
        }
      })
    }

    // create charts
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
        labels: this.labels,
        datasets: [{
          label: 'Current data',
          data: this.windChartData,
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

  getStoredData() {
    let stationdata = localStorage.getItem('stationdata')
    if (stationdata) {
      this.stationdata = JSON.parse(stationdata)
    }
    let labels = localStorage.getItem('labels')
    if (labels) {
      this.labels = JSON.parse(labels)
    }
    let rainChartData = localStorage.getItem('rainChartData')
    if (rainChartData) {
      this.rainChartData = JSON.parse(rainChartData)
    }
    let windChartData = localStorage.getItem('windChartData')
    if (windChartData) {
      this.windChartData = JSON.parse(windChartData)
    }
  }
}
