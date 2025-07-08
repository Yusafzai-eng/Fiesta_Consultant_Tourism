import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; // OnInit import
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.css'
})
export class DashboardTableComponent implements OnInit {

  userSummaries: any[] = [];
  selectedUser: any = null;
  showDetails: boolean = false;
  skeletonArray: number[] = [];
  isloader: boolean = true; // ✅ Loader initially true

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.generateSkeletons(5); // Show 5 skeleton rows initially
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
      let allProducts: any[] = [];

      for (let order of orders) {
        const products: any[] = order.products ?? [];

        products.forEach((product) => {
          allProducts.push({
            ...product,
            userId: order.userId,
            userName: order.userName,
            userEmail: order.userEmail,
            city: order.city,
            address: order.address,
            total: product.total,
            thumbnail: product.thumbnail?.[0] || null,
            order_date: product.order_date
          });
        });
      }

      allProducts.sort((a, b) =>
        new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
      );

      this.userSummaries = allProducts.slice(0, 4);

      // ✅ Add a delay to keep skeleton visible for a short time
     
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
}
