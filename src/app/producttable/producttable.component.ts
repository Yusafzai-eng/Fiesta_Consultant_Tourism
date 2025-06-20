import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ServiceNameService } from '../service-name.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-producttable',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './producttable.component.html',
  styleUrl: './producttable.component.css'
})
export class ProducttableComponent implements OnInit {

  productData: any; // Holds product data
  formData: any; // Holds form data
  productId: string | null = null; // Holds product ID from route

  // Form group for personal details
  personalDetailsForm: FormGroup;
  paymentMethods = ['Visa', 'Mastercard', 'American Express', 'Discover'];
  countries = ['Afghanistan', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Azerbaijan', 'Bahrain', 'Brazil', 'Yemen', 'Zimbabwe'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private depsrv: ServiceNameService,
    private router: Router
  ) {
    // Initialize the form
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}[\s-]?\d{4}[\s-]?\d{4}$/)]], // Allow spaces or hyphens
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['', Validators.required],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // MM/YY format
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      NoofAdult: [this.formData?.NoofAdult || '', Validators.required],
      NoofChild: [this.formData?.NoofChild || '', Validators.required],
      Transfer: [this.formData?.Transfer || '', Validators.required],
      Total: [this.formData?.Total || '', Validators.required],
      
    });
  }

  ngOnInit(): void {
    // Fetch form data from the service
    this.formData = this.depsrv.getFormData();

    // Fetch product data from the service
    this.productData = this.depsrv.getProductData();

    // Initialize the form with formData values
    this.personalDetailsForm.patchValue({
      NoofAdult: this.formData?.NoofAdult || '',
      NoofChild: this.formData?.NoofChild || '',
      Transfer: this.formData?.Transfer || '',
      Total: this.formData?.Total || ''
    });

    // Fetch product details if productId is available
    const productId = this.activatedRoute.snapshot.paramMap.get('_id');
    if (productId) {
      this.depsrv.getproductDepartment(productId).subscribe({
        next: (data) => {
          console.log(data);
          this.productData = data.product;
        },
        error: (err) => {
          console.error('Failed to fetch product data:', err);
        }
      });
    }
  }

  // Navigate to a different page
  navigateToPage(): void {
    this.router.navigate(['/navbar']);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.personalDetailsForm.valid) {
      console.log('Form Submitted:', this.personalDetailsForm.value);
    } else {
      console.log('Form is invalid');
      this.logValidationErrors(); // Log validation errors
    }
  }

  // Log validation errors
  logValidationErrors(): void {
    Object.keys(this.personalDetailsForm.controls).forEach((key) => {
      const controlErrors = this.personalDetailsForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Validation errors for ${key}:`, controlErrors);
      }
    });
  }
}