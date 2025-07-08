import { Component } from '@angular/core';
import { DataService } from '../box/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface User {
  id?: string;
  name?: string;
  email?: string;
  // Add more user fields as needed
}

interface ProductInOrder {
  total: number;
  // Add more fields if needed
}

interface Order {
  date: string;
  products: ProductInOrder[];
  // Add more fields if needed
}

interface Product {
  id?: string;
  name?: string;
  // Add more product fields as needed
}

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.css'
})
export class BoxesComponent {

 cards: any[] = [];
  selectedMonth: string = 'all';
ngOnInit(): void {
  
}
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
        const allOrders: Order[] = res.order ?? [];
        const products: Product[] = res.products ?? [];

        // ✅ Filter orders by selected month
        const filteredOrders = this.selectedMonth === 'all'
          ? allOrders
          : allOrders.filter((order: Order) => {
              const date = new Date(order.date);
              const month = String(date.getMonth() + 1).padStart(2, '0');
              return month === this.selectedMonth;
            });

        // ✅ Calculate total cashed
        let totalCash = 0;
        for (let order of filteredOrders) {
          if (Array.isArray(order.products)) {
            for (let product of order.products) {
              totalCash += Number(product.total ?? 0);
            }
          }
        }

        // ✅ Cards with real data
   this.cards = [
  {
    title: 'Total Service',
    value: products.length,
    tag: 'Tourism',
    tagBg: 'bg-red-100',
    tagText: 'text-red-600',
    chartColor: '#fca5a5',
    icon: 'fa-solid fa-hotel',
    iconColor: '#fca5a5'  // 🔴 light red
  },
  {
    title: 'Total Client',
    value: users.length,
    tag: 'Tourism',
    tagBg: 'bg-red-100',
    tagText: 'text-red-600',
    chartColor: '#fca5a5',
    icon: 'fa-solid fa-users',
    iconColor: '#fca5a5'  // 🔴 light red
  },
  {
    title: 'Total Order',
    value: filteredOrders.length,
    tag: 'Tourism',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    chartColor: '#4EE94E',
    icon: 'fa-brands fa-first-order',
    iconColor: '#4EE94E'  // 🟢 light green
  },
  {
    title: 'Total Cashed',
    value: this.formatCash(totalCash),
    tag: 'Tourism',
    tagBg: 'bg-green-100',
    tagText: 'text-green-700',
    chartColor: '#4EE94E',
    icon: 'fa-solid fa-money-bill-wave',
    iconColor: '#4EE94E'  // 🟢 light green
  }
];


      },
      error: (err) => {
        console.error('❌ Error fetching totals:', err);
      }
    });
  }

  // ✅ Format currency values
  formatCash(amount: number): string {
    if (amount >= 10000000) {
      return `Rs. ${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `Rs. ${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `Rs. ${(amount / 1000).toFixed(1)}K`;
    } else {
      return `Rs. ${amount}`;
    }
  }
}

