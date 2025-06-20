import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ServiceNameService } from '../service-name.service';  // Ensure correct import
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
declare var Swiper: any;
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, RouterOutlet,NgxSkeletonLoaderModule,RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductDetailComponent implements OnInit, AfterViewInit {

 isLoading: boolean = true;
errorMessage: string | null = null;

skeletonArray: number[] = [];
isloader: boolean = false;

minDate: string = '';
selectedDate: string = '';
form:boolean=false;
isapi:boolean=false;
onBooknow() {
  this.isapi = true; 
  setTimeout(() => {
    this.form = true; 
    this.isapi = false; 
  }, 2000); 
}

 
productDetails: any = undefined;
swiper: any;
thumbnailSwiper: any;
depsrv: ServiceNameService;  // Define the service type

constructor(private service: ServiceNameService, private route: ActivatedRoute, private router: Router) {
  this.depsrv = service;  // Ensure it's assigned properly
}
generateSkeletons(count: number) {
  this.skeletonArray = Array(count).fill(0);
}
ngOnInit(): void {
  this.generateSkeletons(8); // or any default expected count

  // Initialize minDate
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  this.minDate = `${year}-${month}-${day}`;

  // Fetch product details from route
  this.route.paramMap.subscribe((params) => {
    const productId = params.get('id');
    this.fetchProductDetails(productId);
    this.userobj.get('NoofAdult').valueChanges.subscribe(() => {
      this.onBookNow();
    });
  
    this.userobj.get('NoofChild').valueChanges.subscribe(() => {
      this.onBookNow();
    });
  
    
  });
}


ngAfterViewInit(): void {
  setTimeout(() => {
    this.initializeSwiper();
    this.initializeThumbnailSwiper();
  }, 0);
}


features = [
  { icon: 'fas fa-tags text-red-600 rotate-45', text: 'BEST PRICE GUARANTEE', route: '/Product_details' },
  { icon: 'fas fa-comments text-green-600 text-2xl', text: '24X7 LIVE CHAT SUPPORT', route: '/Product_details' },
  { icon: 'fas fa-bookmark text-blue-600 text-2xl', text: 'FAST BOOKING', route: '/Product_details' },
  { icon: 'fas fa-star text-red-600 text-2xl', text: '5 STAR FACILITIES', route: '/Product_details' },
  { icon: 'fas fa-wifi text-blue-600 text-2xl', text: 'WIFI COMING SOON', route: '/Product_details' },
];










fetchProductDetails(productId: string | null): void {
  if (!productId) {
    this.errorMessage = 'Invalid product ID.';
    this.isLoading = false;
    return;
  }

  this.isloader = true;
  this.generateSkeletons(8);

  this.service.getproductDepartment(productId).subscribe({
    next: (data: any) => {
      console.log('Service Data:', data);

      // Prefer products if available
      if (data?.products?.producttitle) {
        this.productDetails = data.products;
      } else if (data?.product?.producttitle) {
        this.productDetails = data.product;
      } else {
        console.error('Invalid product data format:', data);
        this.productDetails = undefined;
      }

      this.isloader = false;
    },
    error: (error) => {
      console.error('Error fetching product details:', error);
      this.errorMessage = 'Failed to load product details.';
      this.isloader = false;
    }
  });
}
  showMore: boolean = false;

initializeSwiper(): void {
  if (this.productDetails?.thumbnail?.length > 0) {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      speed: 600,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        nextEl: '.custom-next-button',
        prevEl: '.custom-prev-button',
      },
    });
    this.swiper = swiper;
  }
}

initializeThumbnailSwiper(): void {
  if (this.productDetails?.thumbnail?.length > 0) {
    const thumbnailSwiper = new Swiper('.thumbnail-swiper-container', {
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
      slideToClickedSlide: true, // Allow clicking thumbnails to change main image
    });
    this.thumbnailSwiper = thumbnailSwiper;
  }
}

button = [
  { icon: 'fa-solid fa-calendar-days text-red-500 ', label: 'TourService' },
  { icon: 'fa-solid fa-hourglass-half  text-indigo-600', label: 'Duration' },
  { icon: 'fa-solid fa-car text-pink-600 ', textClass: "text-nowrap", label: '' },
  { icon: 'fa-regular fa-clock  text-green-600 ', label: 'PickUp' },
  { icon: 'fa-solid fa-language  text-indigo-600', label: 'Lang' },
  { icon: 'fa-solid fa-wifi  text-red-500 ', textClass: "text-sm", label: 'Free' },
  { icon: 'fa-solid fa-vault  text-orange-500', label: 'Adult' },
  { icon: 'fa-solid fa-vault  text-pink-600', label: 'Child' },
];


userobj: any = {
  Date: '',
  NoofAdult: '',
  Transfer: '',
  NoofChild: '',
};





showError: boolean = false;
result: number | null = null;

onsignup() {
  if (!this.isFormComplete() || this.result === null) {
    this.showError = true;
    alert("Please complete the form and see the total bill before submitting.");
    return;
  }
  this.showError = false;

  const resultObj = {
    ...this.userobj,
    Total: this.result
  };

  console.log("Form Submitted Successfully with Raw Values", resultObj);

  this.depsrv.setFormData(resultObj);  // Should work now

  if (this.productDetails && this.productDetails.thumbnail && this.productDetails.title) {
    const apiData = {
      image: this.productDetails.thumbnail[0],
      title: this.productDetails.title,
    };
    this.depsrv.setProductData(apiData);
  }

  alert("Signup successful!");

  const productId = this.productDetails?._id;
  if (productId) {
    this.router.navigate(['/producttable', productId]);  
  }
}

onBookNow() {
  // Check if NoofAdult and NoofChild are valid numbers
  if (this.userobj.NoofAdult === null || this.userobj.NoofChild === null) {
    return; // Exit if values are not set
  }

  // Fetch rates for adults and kids from the API response
  let rateAdult = this.productDetails?.adultBaseprice;  // Use the adultBaseprice from API
  let rateChild = this.productDetails?.kidsBaseprice;   // Use the kidsBaseprice from API

  // Ensure rates are available, else show an error
  if (!rateAdult || !rateChild) {
    alert("Rate information is missing for adults or children!");
    return;
  }

  // Calculate the total cost based on the number of adults and children
  let multipliedAdult = this.userobj.NoofAdult * rateAdult;
  let multipliedChild = this.userobj.NoofChild * rateChild;

  // Compute the total result
  this.result = multipliedAdult + multipliedChild;

  // Store the result in the user object
  this.userobj.Total = this.result;

  // Pass the user data to the service
  this.depsrv.setFormData(this.userobj);

  console.log('Total Calculated Automatically:', this.result);
}



isFormComplete(): boolean {
  return this.userobj.Date &&
    this.userobj.NoofAdult &&
    this.userobj.Transfer &&
    this.userobj.NoofChild;
}

}
