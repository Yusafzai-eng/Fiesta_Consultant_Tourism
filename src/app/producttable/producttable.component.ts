import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceNameService } from '../service-name.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producttable',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './producttable.component.html',
  styleUrl: './producttable.component.css'
})
export class ProducttableComponent implements OnInit {

  productData: any;
  formData: any;
  personalDetailsForm: FormGroup;

  paymentMethods = ['Visa', 'Mastercard', 'American Express', 'Discover'];
  countries = ['Afghanistan', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Azerbaijan', 'Bahrain', 'Brazil', 'Yemen', 'Zimbabwe'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private depsrv: ServiceNameService,
    private router: Router,
    private http: HttpClient
  ) {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}[\s-]?\d{4}[\s-]?\d{4}$/)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['', Validators.required],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      NoofAdult: [''],
      NoofChild: [''],
      privateAdult: [''],
      privateChild: [''],
      Transfer: ['', Validators.required],
      Total: ['', Validators.required],
      productId: ['']
    });
  }

  ngOnInit(): void {
    this.formData = this.depsrv.getFormData();
    this.productData = this.depsrv.getProductData();

    this.personalDetailsForm.patchValue({
      NoofAdult: this.formData?.NoofAdult || '',
      NoofChild: this.formData?.NoofChild || '',
      privateAdult: this.formData?.privateAdult || '',
      privateChild: this.formData?.privateChild || '',
      Transfer: this.formData?.Transfer || '',
      Total: this.formData?.Total || '',
      productId: this.productData?._id || ''
    });

    const selectedData = {
      NoofAdult: this.formData?.NoofAdult || 0,
      NoofChild: this.formData?.NoofChild || 0,
      privateAdult: this.formData?.privateAdult || 0,
      privateChild: this.formData?.privateChild || 0,
      Transfer: this.formData?.Transfer || '',
      Total: this.formData?.Total || 0,
      producttitle: this.productData?.producttitle || '',
      thumbnail: this.productData?.thumbnail?.[1] || ''
    };

    localStorage.setItem('bookingSummary', JSON.stringify(selectedData));

    const productId = this.activatedRoute.snapshot.paramMap.get('_id');
    if (productId) {
      this.depsrv.getproductDepartment(productId).subscribe({
        next: (data) => {
          this.productData = data.products;
          this.personalDetailsForm.patchValue({
            productId: this.productData?._id || ''
          });
        },
        error: (err) => {
          console.error('Failed to fetch product data:', err);
        }
      });
    }
  }

  navigateToPage(): void {
    // this.router.navigate(['/main']);
  }

onSubmit(): void {
  if (!this.productData || !this.productData._id) {
    alert('Product is not loaded. Please wait and try again.');
    return;
  }

  if (this.personalDetailsForm.valid) {
    const form = this.personalDetailsForm.value;
    let productsArray = [];

    if (form.Transfer === 'Private') {
      productsArray = [{
        productId: this.productData._id,
        producttitle: this.productData.producttitle,
        productdescription: this.productData.productdescription,
        cityName: this.productData.cityName,
        citydescription: this.productData.citydescription,
        cityImage: this.productData.cityImage,
        tourService: this.productData.tourService,
        duration: this.productData.duration,
        transportService: this.productData.transportService,
        pickUp: this.productData.pickUp,
        price: this.productData.price,
        discountedTotal: this.productData.discountedTotal,
        adultBaseprice: this.productData.adultBaseprice,
        kidsBaseprice: this.productData.kidsBaseprice,
        quantity: this.productData.quantity,
        thumbnail: this.productData.thumbnail,
        categorie: this.productData.categorie,
        translatelanguage: this.productData.translatelanguage,
        wifi: this.productData.wifi,

        // ✅ Private fields
        privateAdult: form.privateAdult,
        privateChild: form.privateChild,
        transfertype: 'Private',
        privatetransferprice: this.productData.privatetransferprice,  // ✅ Make sure backend sends this field
        total: this.productData.privatetransferprice,                 // ✅ Total equals to private transfer price

        order_date: new Date().toLocaleDateString()
      }];
    } else {
      productsArray = [{
        productId: this.productData._id,
        producttitle: this.productData.producttitle,
        productdescription: this.productData.productdescription,
        cityName: this.productData.cityName,
        citydescription: this.productData.citydescription,
        cityImage: this.productData.cityImage,
        tourService: this.productData.tourService,
        duration: this.productData.duration,
        transportService: this.productData.transportService,
        pickUp: this.productData.pickUp,
        price: this.productData.price,
        discountedTotal: this.productData.discountedTotal,
        adultBaseprice: this.productData.adultBaseprice,
        kidsBaseprice: this.productData.kidsBaseprice,
        quantity: this.productData.quantity,
        thumbnail: this.productData.thumbnail,
        categorie: this.productData.categorie,
        translatelanguage: this.productData.translatelanguage,
        wifi: this.productData.wifi,

        // ✅ Shared fields
        adults_no: form.NoofAdult,
        kids_no: form.NoofChild,
        transfertype: 'Shared',
        transferPrice: this.productData.sharedTransferPrice,
        total: form.Total,  // ✅ Total from calculated shared price

        order_date: new Date().toLocaleDateString()
      }];
    }

    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      address: form.address,
      payment_Method: form.paymentMethod,
      city: form.city,
      state: form.state,
      country: form.country,
      name_On_Card: form.nameOnCard,
      card_Number: form.cardNumber,
      zip: Number(form.zip),
      expiry: form.expiry,
      cvv: form.cvv,
      products: productsArray,
      date: new Date().toLocaleDateString()
    };

    console.log("Payload to be sent:", payload);

    this.http.post('http://localhost:4000/api/cart', payload, { withCredentials: true }).subscribe({
      next: (res) => {
        alert('Booking Successful!');
        // this.router.navigate(['/navbar']);
      },
      error: (err) => {
        console.error('Error posting data:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  } else {
    console.log('Form is invalid');
    this.logValidationErrors();
  }
}


  logValidationErrors(): void {
    Object.keys(this.personalDetailsForm.controls).forEach((key) => {
      const controlErrors = this.personalDetailsForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Validation errors for ${key}:`, controlErrors);
      }
    });
  }
}