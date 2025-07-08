import { Component, OnInit } from '@angular/core';
import {
  Chart,
  PieController,
  BarController,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { ChartssService } from '../chartsservice/chartss.service';

Chart.register(
  PieController,
  BarController,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {
  constructor(private chardata: ChartssService) {}

  ngOnInit(): void {
    this.chardata.getChartData().subscribe((res: any) => {
      const yearMap: { [year: string]: number } = {};
      const colorMap: { [year: string]: string } = {};
      const borderColorMap: { [year: string]: string } = {};

      const currentYear = new Date().getFullYear();

      // ✅ Your requested colors:
      const backgroundColors = [
        'rgba(15, 30, 239, 0.6)',   // Blue
        'rgba(15, 239, 59, 0.6)'    // Green
      ];

      const borderColorsList = [
        'rgba(15, 30, 239, 1)',     // Blue border
        'rgba(15, 239, 59, 1)'      // Green border
      ];

      res.order.forEach((order: any) => {
        order.products.forEach((product: any) => {
          const dateStr = product.order_date;
          const year = new Date(dateStr).getFullYear();

          if (year < currentYear - 4) return;

          const total = product.total;
          const yearStr = year.toString();

          if (!yearMap[yearStr]) {
            const index = Object.keys(yearMap).length % 2;
            colorMap[yearStr] = backgroundColors[index];
            borderColorMap[yearStr] = borderColorsList[index];
          }

          yearMap[yearStr] = (yearMap[yearStr] || 0) + total;
        });
      });

      const years = Object.keys(yearMap);
      const totals = years.map(y => yearMap[y]);
      const colors = years.map(y => colorMap[y]);
      const borderColors = years.map(y => borderColorMap[y]);

      this.showdata(years, totals, colors, borderColors);
    });
  }

  showdata(year: any, amount: any, color: any, borderColor: any) {
    // Pie Chart
    new Chart("mychart", {
      type: 'pie',
      data: {
        labels: year,
        datasets: [{
          label: 'Total',
          data: amount,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true }
        }
      }
    });

    // Bar Chart
    new Chart("barchart", {
      type: 'bar',
      data: {
        labels: year,
        datasets: [{
          label: 'Total Sales per Year',
          data: amount,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}
