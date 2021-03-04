import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() pieChartLabels: Label[] = ['new', 'paid'];
  @Input() pieChartData: ChartDataSets[] = [{data: [0, 0]}];
  @Input() pieChartColor: Color[] = [];

  public pieChartOptions: ChartOptions = {
    legend: {
      labels: { fontColor: 'white' },
      align: 'end',
      position: 'right',
    },
    responsive: true,
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit(): void { }

}
