import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-graphline',
  templateUrl: './graphline.component.html',
  styleUrls: ['./graphline.component.css']
})
export class GraphlineComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    {data:[],label:""}
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          id: 'x-axis-0',
          ticks: {
            fontColor: 'white',
          }
        }
    ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'white',
          }
        }
      ]
    },
    annotation: {

    }
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(255, 10, 10, 0.4)',
      borderColor: 'rgba(26, 0, 0, 0.73)',
      pointBackgroundColor: 'rgba(209, 0, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];


  constructor() { }

  ngOnInit(): void {
  }

}
