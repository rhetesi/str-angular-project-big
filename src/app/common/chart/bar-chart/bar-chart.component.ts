import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() barChartLabels: Label[] = ['new', 'shipped', 'paid'];
  @Input() barChartData: ChartDataSets[] = [
    {
      data: [0, 0, 0],
      label: 'orders',
    },
  ];
  @Input() barChartColor: Color[] = [];

  // @Input() maxValue: number;

  public barChartOptions: ChartOptions = {

    legend: {
      labels: {
          // This more specific font property overrides the global property
        fontColor: 'white',
      },
      position: 'bottom',
    },
    responsive: true,
    // We use these empty structures as placeholders for dinamic theming.
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(230,230,230,1)',
          lineWidth: 1
        },
        ticks: {
          fontColor: 'rgba(255,255,255,1)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(230,230,230,1)',
          lineWidth: 1
        },
        ticks: {
          fontColor: 'rgba(230,230,230,1)',
          // max: this.maxValue,
          min: 0,
          // stepSize: 5
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
