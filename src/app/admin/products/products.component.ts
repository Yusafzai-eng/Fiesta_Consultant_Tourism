import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { AddProductService } from '../adminservice/add-product.service';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxSkeletonLoaderModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

constructor(private http: HttpClient, private productService: AddProductService,private router:Router) {}
  skeletonArray: number[] = [];
  isloader: boolean = true; //
   Products: any[] = [];
  pagedProducts: any[] = [];

  modalType: 'text' | 'images' | 'description' | null = null;
  modalData: any;

  currentPage = 1;
itemsPerPage = 8; // 👈 Set to 8 products per page
  totalPages = 0;


 ngOnInit(): void {
      this.generateSkeletons(5); // Show 5 skeleton rows initially
  this.fetchproduct();
  this.onItemsPerPageChange(); // 👈 Add this line
}
 generateSkeletons(count: number) {
    this.skeletonArray = Array(count).fill(0);
  }
  fetchproduct(): void {
     this.isloader = true;
  this.generateSkeletons(5);
    this.http.get<any>('http://localhost:4000/api/admin', {
      withCredentials: true
    }).subscribe({
      next: (res) => {
        this.Products = res.products ?? [];
        this.calculatePagination();
        console.log(res.products);
        
      },
       error: (err) => {
      console.error('❌ Error:', err);
      this.isloader = false;
    }
    });
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.Products.length / this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProducts = this.Products.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.calculatePagination();
  }

  openModal(type: 'text' | 'images' | 'description', data: any) {
    this.modalType = type;
    this.modalData = data;
  }

  closeModal() {
    this.modalType = null;
    this.modalData = null;
  }


deleteProduct(productId: string) {
  this.productService.deleteProduct(productId).subscribe({
    next: () => {
      alert('Deleted!');
      this.fetchproduct(); // 🔄 Refresh list
    },
    error: (err) => {
      console.error('❌ Failed to delete product:', err);
    }
  });
}


onEdit(id: string) {
  this.router.navigate(['/admin/edit', id]);
  console.log(id);
  
}



}