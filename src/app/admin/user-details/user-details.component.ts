import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductService } from '../adminservice/add-product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';
  userOrders: any[] = [];
  filteredOrders: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedProduct: any = null;
  userName: string = '';
  address: string = '';
  selectedOrder: any = null;
  searchQuery: string = '';
  
  // Delete confirmation variables
  showDeleteConfirmation: boolean = false;
  orderToDelete: string = '';
  productToDelete: string = '';

  // Edit variables
  editingProduct: any = null;
  showEditLoader: boolean = false;
  orderToEdit: string = '';

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private addservice: AddProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
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
        this.filteredOrders = [...this.userOrders];
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

  filterProducts() {
    if (!this.searchQuery) {
      this.filteredOrders = [...this.userOrders];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredOrders = this.userOrders.map(order => {
      const filteredProducts = order.products.filter((product: any) => 
        product.producttitle.toLowerCase().includes(query)
      );
      return { ...order, products: filteredProducts };
    }).filter(order => order.products.length > 0);
  }

onTransferTypeChange() {
  if (this.editingProduct.transfertype === 'Private') {
    this.editingProduct.privateAdult = this.editingProduct.privateAdult || 1;
    this.editingProduct.privateChild = this.editingProduct.privateChild || 0;
    this.editingProduct.privatetransferprice = this.editingProduct.privatetransferprice || 0;
  } else {
    this.editingProduct.adults_no = this.editingProduct.adults_no || 1;
    this.editingProduct.kids_no = this.editingProduct.kids_no || 0;
    this.editingProduct.total = this.editingProduct.total || 0;
  }
}


  calculateTotal(order: any): number {
    return order.products.reduce((sum: number, product: any) => sum + (product.total || 0), 0);
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  openModal(product: any) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = null;
  }

  openPaymentModal(order: any) {
    this.selectedOrder = order;
  }

  closeModalpayment() {
    this.selectedOrder = null;
  }

  deleteProduct(orderId: string, productId: string) {
    this.orderToDelete = orderId;
    this.productToDelete = productId;
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    this.showDeleteConfirmation = false;
    this.addservice.deleteProductorder(this.orderToDelete, this.productToDelete).subscribe({
      next: () => {
        alert('Product deleted successfully!');
        this.getUserOrders();
      },
      error: (err) => {
        console.error('❌ Failed to delete product:', err);
      }
    });
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.orderToDelete = '';
    this.productToDelete = '';
  }



  closeEditModal() {
    this.editingProduct = null;
  }

 // When editing a product
onEdit(orderId: string, product: any) {
  this.editingProduct = { ...product };
  this.orderToEdit = orderId; // Make sure this is the correct order ID
  console.log('Editing:', { 
    orderId: this.orderToEdit, 
    productId: this.editingProduct._id 
  });
}

saveEdit() {
  if (!this.orderToEdit || !this.editingProduct?._id) {
    console.error('Missing IDs:', {
      orderId: this.orderToEdit,
      productId: this.editingProduct?._id
    });
    return;
  }

  // Prepare the data based on transfer type
  const updatedData: any = {
    transfertype: this.editingProduct.transfertype,
    order_date: this.editingProduct.order_date
  };

  if (this.editingProduct.transfertype === 'Private') {
    // Include private transfer specific fields
    updatedData.privateAdult = this.editingProduct.privateAdult;
    updatedData.privateChild = this.editingProduct.privateChild;
    updatedData.privatetransferprice = this.editingProduct.privatetransferprice;
    
    // Clear shared transfer fields (optional, backend should handle this)
    updatedData.adults_no = 0;
    updatedData.kids_no = 0;
    updatedData.total = 0;
  } else {
    // Include shared transfer specific fields
    updatedData.adults_no = this.editingProduct.adults_no;
    updatedData.kids_no = this.editingProduct.kids_no;
    updatedData.total = this.editingProduct.total;
    
    // Clear private transfer fields (optional, backend should handle this)
    updatedData.privateAdult = 0;
    updatedData.privateChild = 0;
    updatedData.privatetransferprice = 0;
  }

  this.showEditLoader = true;

  this.addservice.updateOrderProduct(
    this.orderToEdit,
    this.editingProduct._id,
    updatedData
  ).subscribe({
    next: (res) => {
      alert('✅ Product updated successfully!');
      this.getUserOrders(); // Refresh list
      this.editingProduct = null; // Close modal
      this.showEditLoader = false;
    },
    error: (err) => {
      console.error('❌ Error while updating product:', err);
      alert('Failed to update product. Please try again.');
      this.showEditLoader = false;
    }
  });
}

}