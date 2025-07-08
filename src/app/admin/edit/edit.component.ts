import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../adminservice/add-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  productData: any = {};
  cityImageFile: File | null = null;
  thumbnailFiles: File[] = [];

  constructor(private route: ActivatedRoute, private service: AddProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getProductById(id).subscribe((data) => {
        this.productData = data.product;

        // ✅ Explicitly set _id in case it’s not directly enumerable
        this.productData._id = data.product._id;
        console.log("✅ Loaded product ID:", this.productData._id);
      });
    }
  }

  onThumbnailChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.thumbnailFiles = Array.from(files);
    }
  }

  onCityImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.cityImageFile = file;
    }
  }

updateProduct(): void {
  const formData = new FormData();
  const id = this.productData._id;

  if (!id) {
    console.error('Product ID is missing');
    return;
  }

  // Append all product data fields except files
  Object.keys(this.productData).forEach(key => {
    if (key !== 'thumbnail' && key !== 'cityImage' && this.productData[key] !== null) {
      formData.append(key, this.productData[key]);
    }
  });

  // Handle city image
  if (this.cityImageFile) {
    formData.append('cityImage', this.cityImageFile);
    if (this.productData.cityImage) {
      formData.append('existingCityImage', this.productData.cityImage);
    }
  } else if (this.productData.cityImage) {
    formData.append('cityImage', this.productData.cityImage);
  }

  // Handle thumbnails
  if (this.thumbnailFiles.length > 0) {
    this.thumbnailFiles.forEach(file => formData.append('thumbnail', file));
    if (this.productData.thumbnail) {
      this.productData.thumbnail.forEach((thumb: string) => 
        formData.append('existingThumbnails', thumb)
      );
    }
  } else if (this.productData.thumbnail) {
    this.productData.thumbnail.forEach((thumb: string) => 
      formData.append('thumbnail', thumb)
    );
  }

  // Debug: Log FormData contents
  for (let [key, value] of (formData as any).entries()) {
    console.log(key, value);
  }

  this.service.updateProduct(id, formData).subscribe({
    next: (res) => {
      alert('✅ Product updated successfully!');
    },
    error: (err) => {
      console.error('Update error:', err);
      alert('❌ Update failed: ' + (err.error?.message || err.message));
    }
  });
}
}
