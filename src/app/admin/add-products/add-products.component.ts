import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddProductService } from '../adminservice/add-product.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  constructor(private postproduct: AddProductService) {}

  AddproductForm: FormGroup = new FormGroup({
    producttitle: new FormControl('', Validators.required),
    productdescription: new FormControl('', Validators.required),
    thumbnail: new FormControl(null, Validators.required), // multiple files
    tourService: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    transportService: new FormControl('', Validators.required),
    pickUp: new FormControl('', Validators.required),
    translatelanguage: new FormControl('', Validators.required),
    wifi: new FormControl('', Validators.required),
    adultBaseprice: new FormControl('', Validators.required),
    kidsBaseprice: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    prime: new FormControl('', Validators.required),
    nonprime: new FormControl('', Validators.required),
    discountPercentage: new FormControl('', Validators.required),
    discountedTotal: new FormControl('', Validators.required), // camelCase form field
    privatetransferprice: new FormControl('', Validators.required),
    privatetransferperson: new FormControl('', Validators.required),
    cityName: new FormControl('', Validators.required),
    citydescription: new FormControl('', Validators.required),
    cityImage: new FormControl(null, Validators.required), // single file
    categorie: new FormControl('', Validators.required),
  });

  thumbnailFiles: File[] = [];
  cityImageFile: File | null = null;

  onThumbnailChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.thumbnailFiles = Array.from(files);
      this.AddproductForm.patchValue({ thumbnail: this.thumbnailFiles });
    }
  }

  onCityImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.cityImageFile = file;
      this.AddproductForm.patchValue({ cityImage: this.cityImageFile });
    }
  }

Save(): void {
  const formValues = this.AddproductForm.value;
  const formData = new FormData();

  // Rename 'discountedTotal' to 'discountedtotal'
  const correctedValues = {
    ...formValues,
    discountedtotal: formValues.discountedTotal
  };
  delete correctedValues.discountedTotal;

  Object.entries(correctedValues).forEach(([key, value]) => {
    if (key !== 'thumbnail' && key !== 'cityImage') {
      formData.append(key, value as string);
    }
  });

  // Append files
  if (this.cityImageFile) {
    formData.append('cityImage', this.cityImageFile);
  }

  this.thumbnailFiles.forEach(file => {
    formData.append('thumbnail', file);
  });

  this.postproduct.postProduct(formData).subscribe(
    (res) => {
      console.log('✅ Product posted successfully:', res);
      alert('✅ Product has been added successfully!');
      this.AddproductForm.reset(); // optional: reset form
      this.thumbnailFiles = [];
      this.cityImageFile = null;
    },
    (error) => {
      if (error.error instanceof ErrorEvent) {
        console.error('❌ Client Error:', error.error.message);
      } else {
        console.error('❌ Server Error:', error.status, error.error);
        alert(`❌ Server Error: ${error.status} - ${error.error?.msg || 'Something went wrong'}`);
      }
    }
  );
}


}
