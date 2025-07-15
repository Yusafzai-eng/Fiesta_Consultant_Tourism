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
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  constructor(private chardata: ChartssService) {}

  ngOnInit(): void {
    this.chardata.getChartData().subscribe((res: any) => {
      console.log('Raw API Data:', res); // Debug log

      const yearData = this.processChartData(res);
      this.showdata(yearData.years, yearData.totals, yearData.colors, yearData.borderColors);
    });
  }

  private processChartData(res: any): {
    years: string[],
    totals: number[],
    colors: string[],
    borderColors: string[]
  } {
    const yearMap: { [year: string]: number } = {};
    const currentYear = new Date().getFullYear();

    // 1. Process Orders Data
    res.order?.forEach((order: any) => {
      // Handle both order.date and product.order_date
      const dateStr = order.date || order.products?.[0]?.order_date;
      if (!dateStr) return;

      // Parse date (handling both dd/MM/yyyy and ISO formats)
      const date = this.parseDate(dateStr);
      if (!date) return;

      const year = date.getFullYear();
      if (year < currentYear - 4) return; // Only show last 5 years

      // Sum totals for the year
      order.products?.forEach((product: any) => {
        const total = parseFloat(product.total) || 0;
        yearMap[year] = (yearMap[year] || 0) + total;
      });
    });

    // 2. Prepare Chart Data
    const years = Object.keys(yearMap).sort();
    const totals = years.map(year => yearMap[year]);

    // Color scheme (blue and green)
    const backgroundColors = years.map((_, i) => 
      i % 2 === 0 ? 'rgba(15, 30, 239, 0.6)' : 'rgba(15, 239, 59, 0.6)'
    );
    const borderColors = years.map((_, i) => 
      i % 2 === 0 ? 'rgba(15, 30, 239, 1)' : 'rgba(15, 239, 59, 1)'
    );

    console.log('Processed Chart Data:', { years, totals }); // Debug log

    return { years, totals, colors: backgroundColors, borderColors };
  }

  private parseDate(dateStr: string): Date | null {
    try {
      // Handle dd/MM/yyyy format
      if (dateStr.includes('/')) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      }
      // Fallback to ISO format
      return new Date(dateStr);
    } catch (e) {
      console.error('Error parsing date:', dateStr, e);
      return null;
    }
  }

  showdata(years: string[], totals: number[], colors: string[], borderColors: string[]) {
    // Destroy existing charts if they exist
    Chart.getChart("mychart")?.destroy();
    Chart.getChart("barchart")?.destroy();

    // Pie Chart
    new Chart("mychart", {
      type: 'pie',
      data: {
        labels: years,
        datasets: [{
          label: 'Total Revenue (AED)',
          data: totals,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `AED ${context.raw?.toLocaleString()}`;
              }
            }
          }
        }
      }
    });

    // Bar Chart
    new Chart("barchart", {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Total Revenue (AED)',
          data: totals,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `AED ${value}`
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return `AED ${context.raw?.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
  }
}