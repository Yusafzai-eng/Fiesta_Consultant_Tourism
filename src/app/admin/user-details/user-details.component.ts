import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductService } from '../adminservice/add-product.service';
import { Router } from '@angular/router'; // ✅ This is correct

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {










  
 userId: string = '';
  userOrders: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
selectedProduct: any = null;
userName: string = '';

openModal(product: any) {
  this.selectedProduct = product;
}

closeModal() {
  this.selectedProduct = null;
}

  constructor(private http: HttpClient, private route: ActivatedRoute,private addservice:AddProductService,private router:Router) {}

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.userId = params.get('userId') || '';
    console.log("📦 User ID from route:", this.userId);
    if (this.userId) {
      this.getUserOrders();
    } else {
      this.error = "No user ID provided";
    }
  });
}

getUserOrders() {
  this.isLoading = true;
  this.error = null;

  this.http.get<any>(`http://localhost:4000/api/userordersdetails?userId=${this.userId}`, {
    withCredentials: true
  }).subscribe({
    next: (res) => {
      this.userOrders = res.orders || [];
      if (this.userOrders.length > 0) {
        this.userName = this.userOrders[0].userName || '';
      } else {
        this.error = "No orders found for this user";
      }
      this.isLoading = false;
    },
    error: (err) => {
      this.error = err.message || "Failed to load orders";
      this.isLoading = false;
    }
  });
}


  calculateTotal(order: any): number {
    return order.products.reduce((sum: number, product: any) => sum + (product.total || 0), 0);
  }

  capitalizeFirstLetter(name: string): string {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}




//  deleteProduct(productId: string) {
//     this.productService.deleteProduct(productId).subscribe({
//       next: () => {
//         alert('Deleted!');
//         this.fetchproduct();
//       },
//       error: (err) => {
//         console.error('❌ Failed to delete product:', err);
//       }
//     });
//   }




deleteProduct(orderId: string, productId: string) {
  this.addservice.deleteProductorder(orderId, productId).subscribe({
    next: () => {
      alert('Product deleted!');
      this.getUserOrders();
    },
    error: (err) => {
      console.error('❌ Failed to delete product:', err);
    }
  });
}

onEdit(id: string) {
  this.router.navigate(['/admin/user-Order-details', id]);
  console.log(id);
  
}


}
