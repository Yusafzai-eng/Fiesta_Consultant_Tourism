import { Component } from '@angular/core';
import { DataService } from '../box/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface Product {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.css'
})
export class BoxesComponent {

  cards: any[] = [];
  selectedMonth: string = 'all';

  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' }
  ];

  constructor(private admin: DataService) {
    this.loadData();
  }

  loadData() {
    this.admin.Total().subscribe({
      next: (res) => {
        const users: User[] = res.users ?? [];
        const allOrders: any[] = res.order ?? [];
        const products: Product[] = res.products ?? [];

        const currentYear = new Date().getFullYear().toString();

        const filteredOrders = allOrders.filter((order: any) => {
          const [day, month, year] = order.date.split('/');
          const isCurrentYear = year === currentYear;

          if (!this.selectedMonth || this.selectedMonth === 'all') {
            return isCurrentYear;
          }

          return month === this.selectedMonth && isCurrentYear;
        });

        // ✅ Calculate totalCash with total + privatetransferprice
        let totalCash = 0;
        for (let order of filteredOrders) {
          if (Array.isArray(order.products)) {
            for (let product of order.products) {
              const total = Number(product.total ?? 0);
              const privateTransfer = Number(product.privatetransferprice ?? 0);
              totalCash += total + privateTransfer;
            }
          }
        }

        this.cards = [
          {
            title: 'Total Service',
            value: products.length,
            tag: 'Tourism',
            tagBg: 'bg-red-100',
            tagText: 'text-red-600',
            chartColor: '#fca5a5',
            icon: 'fa-solid fa-hotel',
            iconColorClass: 'text-[#fca5a5]'
          },
          {
            title: 'Total Client',
            value: users.length,
            tag: 'Tourism',
            tagBg: 'bg-red-100',
            tagText: 'text-red-600',
            chartColor: '#fca5a5',
            icon: 'fa-solid fa-users',
            iconColorClass: 'text-[#fca5a5]'
          },
          {
            title: 'Total Order',
            value: filteredOrders.length,
            tag: 'Tourism',
            tagBg: 'bg-green-100',
            tagText: 'text-green-700',
            chartColor: '#4EE94E',
            icon: 'fa-brands fa-first-order',
            iconColorClass: 'text-[#4EE94E]'
          },
          {
            title: 'Total Cashed',
            value: this.formatCash(totalCash),
            tag: 'Tourism',
            tagBg: 'bg-green-100',
            tagText: 'text-green-700',
            chartColor: '#4EE94E',
            icon: 'fa-solid fa-money-bill-wave',
            iconColorClass: 'text-[#4EE94E]'
          }
        ];
      },
      error: (err) => {
        console.error('❌ Error fetching totals:', err);
      }
    });
  }

  formatCash(amount: number): string {
    if (amount >= 10000000) {
      return `AED. ${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `AED. ${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `AED. ${(amount / 1000).toFixed(1)}K`;
    } else {
      return `AED. ${amount}`;
    }
  }
}
