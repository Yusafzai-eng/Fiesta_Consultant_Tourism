import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router } from '@angular/router'; // ✅ This is correct

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxSkeletonLoaderModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  skeletonArray: number[] = [];
  isloader: boolean = true;
  userSummaries: any[] = [];
  originalUserSummaries: any[] = [];
  selectedUser: any = null;
  showDetails: boolean = false;

  selectedFilter: string = 'all';
  selectedCity: string = '';
  selectedDate: string = '';

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.generateSkeletons(5);
    this.fetchData();
  }

  generateSkeletons(count: number) {
    this.skeletonArray = Array(count).fill(0);
  }

fetchData(): void {
  this.isloader = true;
  this.generateSkeletons(5);

  this.http.get<any>('http://localhost:4000/api/admin', {
    withCredentials: true
  }).subscribe({
    next: (res) => {
      const orders = res.order ?? [];
      const userMap = new Map<string, any>();

      for (let order of orders) {
        const key = order.userEmail;
        const userId = order.userId;
        const name = order.userName;
        const address = order.address;
        const products: any[] = order.products ?? [];

        // ✅ TOTAL = shared total + private transfer price
        const total = products.reduce((sum: number, p: any) => {
          const shared = p.total || 0;
          const privateTransfer = p.privatetransferprice || 0;
          return sum + shared + privateTransfer;
        }, 0);

        const orderDate = new Date(order.date);

        // ✅ Thumbnail logic
        let firstThumbnail = null;
        for (let i = 0; i < products.length; i++) {
          if (products[i]?.thumbnail?.[0]) {
            firstThumbnail = products[i].thumbnail[0];
            break;
          }
        }

        if (!userMap.has(key)) {
          userMap.set(key, {
            userId,
            userName: name,
            userEmail: key,
            address,
            total,
            products: [...products],
            latestDate: orderDate,
            thumbnail: firstThumbnail
          });
        } else {
          const existing = userMap.get(key);

          // ✅ Add to existing total
          const extraTotal = products.reduce((sum: number, p: any) => {
            return sum + (p.total || 0) + (p.privatetransferprice || 0);
          }, 0);

          existing.total += extraTotal;
          existing.products.push(...products);

          if (orderDate > existing.latestDate) {
            existing.latestDate = orderDate;

            if (!existing.thumbnail && firstThumbnail) {
              existing.thumbnail = firstThumbnail;
            }
          }
        }
      }

      // ✅ Filter out users with total = 0 and sort by date
      this.userSummaries = Array.from(userMap.values())
        .filter(u => u.total > 0)
        .sort((a, b) => b.latestDate - a.latestDate);

      this.originalUserSummaries = [...this.userSummaries];
      this.isloader = false;
    },
    error: (err) => {
      console.error('❌ Error:', err);
      this.isloader = false;
    }
  });
}



  showUserDetails(user: any) {
    this.selectedUser = user;
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
  }

  applyFilter(): void {
    let filtered = [...this.originalUserSummaries];

    // Filter by last 2 product orders
    if (this.selectedFilter === 'last2') {
      let allProducts: any[] = [];
      this.originalUserSummaries.forEach((user: any) => {
        user.products.forEach((product: any) => {
          allProducts.push({
            ...product,
            userName: user.userName,
            userEmail: user.userEmail,
            userId: user.userId,
            thumbnail: user.thumbnail,
            address: user.address,
            cityName: product.cityName
          });
        });
      });

      allProducts.sort((a, b) =>
        new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
      );

      const last2 = allProducts.slice(0, 3);
      const filteredUsersMap = new Map<string, any>();

      last2.forEach((p: any) => {
        if (!filteredUsersMap.has(p.userEmail)) {
          filteredUsersMap.set(p.userEmail, {
            userId: p.userId,
            userName: p.userName,
            userEmail: p.userEmail,
            address: p.address,
            total: p.total,
            thumbnail: p.thumbnail,
            products: [p],
            latestDate: new Date(p.order_date)
          });
        } else {
          const existing = filteredUsersMap.get(p.userEmail);
          existing.products.push(p);
          existing.total += p.total;
        }
      });

      filtered = Array.from(filteredUsersMap.values());
    }

    // ✅ City filter (from product.cityName)
    if (this.selectedCity.trim() !== '') {
      filtered = filtered.filter((user) =>
        user.products.some(
          (p: any) =>
            p.cityName?.toLowerCase().trim() === this.selectedCity.toLowerCase().trim()
        )
      );
    }

    // ✅ Date filter (from product.order_date)
    if (this.selectedDate) {
      const selectedDateStr = new Date(this.selectedDate).toDateString();
      filtered = filtered.filter((user) =>
        user.products.some((p: any) =>
          new Date(p.order_date).toDateString() === selectedDateStr
        )
      );
    }

    this.userSummaries = filtered;
  }

  resetFilters(): void {
    this.selectedFilter = 'all';
    this.selectedCity = '';
    this.selectedDate = '';
    this.userSummaries = [...this.originalUserSummaries];
  }

onEdit(id: string) {
  this.router.navigate(['/admin/edit', id]);
  console.log(id);
  
}


}

