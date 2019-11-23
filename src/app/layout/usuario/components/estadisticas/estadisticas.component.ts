import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Color } from 'ng2-charts';
/* import Chart from 'chart.js'; */

// CommonJS
/* var CanvasJS = require('canvasjs'); */

// If you are using ES6, then
/* import CanvasJS from 'canvasjs'; */


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {


  trans = [
    "Orden propia : ₡ 1 300",
    "Orden amigo : ₡ 900",
    "Orden propia : ₡ 1 900",
    "Orden amigo : ₡ 1 800",
    "Orden amigo : ₡ 2 000",
    "Orden propia : ₡ 1 000",
    "Orden propia : ₡ 1 300",
    "Orden amigo : ₡ 1 300",
    "Orden amigo : ₡ 1 800",
    "Orden amigo : ₡ 2 000"]


  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() { }

  /* Ordenes por tipo de plato */
  barChartOptions_Ord_Mes: ChartOptions = {
    responsive: true,

  };
  barChartLabels_Ord_Mes: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  barChartType_Ord_Mes: ChartType = 'bar';
  barChartLegend_Ord_Mes = true;
  barChartPlugins_Ord_Mes = [];

  barChartData_Ord_Mes: ChartDataSets[] = [
    {
      data: [6, 5, 4, 7, 3, 2, 3, 5, 2, 3, 5, 2, 2, 0],

      label: 'Meses',

    }
  ];

  /* Ordenes realizadas por mes */
  public pieChartOptions_Ord_TPlato: ChartOptions = {
    responsive: true,

  };
  public pieChartLabels_Ord_TPlato: Label[] = ['Postres', 'Carnes Rojas', 'Típico'];
  public pieChartData_Ord_TPlato: SingleDataSet = [30, 50, 20];
  public pieChartType_Ord_TPlato: ChartType = 'pie';
  public pieChartLegend_Ord_TPlato = true;
  public pieChartPlugins_Ord_TPlato = [];



  private pieColors = [
    {
      backgroundColor: [
        '#b1d4e0',
        '#2e8bc0',
        '#0c2d48',
        '#145da0',
        '#c3e0e5',
        '#274472',
        '#5885af',
        '#41729f',
        '#c2e2f5',
        '#79a9f5',
        '#4b7bf5',
        '#0000ff'
      ]
    }
  ];


  /* Ordenes por mes */
  barChartOptions_Pts_Mes: ChartOptions = {
    responsive: true,
  };
  barChartLabels_Pts_Mes: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  barChartType_Pts_Mes: ChartType = 'bar';
  barChartLegend_Pts_Mes = true;
  barChartPlugins_Pts_Mes = [];

  barChartData_Pts_Mes: ChartDataSets[] = [
    { data: [1, 5, 4, 7, 3, 2, 3, 5, 2, 3, 5, 2, 2, 0], label: 'Meses' }
  ];

  public barChartColors: Color[] = [
    {
      backgroundColor: '#145da0',
    },
  ];
  /*  public barChartColors: Array<any> = [
     {
       backgroundColor: [
         '#b1d4e0',
         '#2e8bc0',
         '#0c2d48',
         '#145da0',
         '#c3e0e5',
         '#274472',
         '#5885af',
         '#41729f',
         '#c2e2f5',
         '#79a9f5',
         '#4b7bf5',
         '#0000ff'
       ]
     }] */


}
