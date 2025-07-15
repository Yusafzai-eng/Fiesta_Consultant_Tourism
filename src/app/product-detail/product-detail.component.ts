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
  if (!productId) return;

  this.isloader = true;

  this.service.getproductDepartment(productId).subscribe({
    next: (data: any) => {
      const product = data?.products || data?.product;
      if (!product) {
        this.productDetails = undefined;
        return;
      }

      this.productDetails = product;

      // Optional: fill values into userobj if needed (only viewable)
      if (product.private) {
        this.userobj.privateAdult = product.privateAdult;
        this.userobj.privateChild = product.privateChild;
      }

      this.isloader = false;
    },
    error: () => {
      this.isloader = false;
      this.errorMessage = "Failed to load product details.";
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
  this.onBookNow();  // Recalculate bill before checking

  if (!this.isFormComplete() || this.result === null) {
    alert("Please complete the form and see the total bill before submitting.");
    return;
  }

  const adultCount = Number(this.userobj.NoofAdult) || 0;
  const childCount = Number(this.userobj.NoofChild) || 0;
  const totalPeople = adultCount + childCount;
  const maxQuantity = Number(this.productDetails?.quantity);  // 👈 backend-defined quantity

  if (maxQuantity && totalPeople > maxQuantity) {
    this.showError = true;
    this.errorMessage = `❌ Only ${maxQuantity} people allowed. You selected ${totalPeople}.`;
    return;
  }

  this.showError = false;
  this.errorMessage = '';

  const resultObj = {
    ...this.userobj,
    Total: this.result
  };

  this.depsrv.setFormData(resultObj);

  if (this.productDetails?.thumbnail && this.productDetails?.title) {
    const apiData = {
      image: this.productDetails.thumbnail[0],
      title: this.productDetails.title,
    };
    this.depsrv.setProductData(apiData);
  }

  alert("✅ Booking successful!");

  const productId = this.productDetails?._id;
  if (productId) {
    this.router.navigate(['/producttable', productId]);
  }
}




// Add this property to your component class
showPrivateForm = false;

// Add this method for private transfer booking
onPrivateBookNow() {
  // Set transfer type to Private
  this.userobj.Transfer = 'Private';
  
  // Calculate total for private transfer
  const privateTransferPrice = this.productDetails?.privatetransferprice || 0;
  const perPersonPrice = this.productDetails?.privatetransferperson || 0;
  
  // Calculate based on number of people
  const totalPeople = (this.userobj.NoofAdult || 0) + (this.userobj.NoofChild || 0);
  this.result = privateTransferPrice + (totalPeople * perPersonPrice);
  this.userobj.Total = this.result;
  
  // Save form data
  this.depsrv.setFormData(this.userobj);
  
  // Show success alert
  alert('Booking successful!');
   const productId = this.productDetails?._id;
  if (productId) {
    this.router.navigate(['/producttable', productId]);
  }
  // Close the form
  this.form = false;
  
  // Navigate to next component (replace 'next-component' with your actual route)
  // this.router.navigate(['/next-component']);
}

// Modify your existing onBookNow method to set transfer type to Shared
onBookNow() {
  // Set transfer type to Shared by default
  this.userobj.Transfer = 'Shared';
  
  const adultCount = Number(this.userobj.NoofAdult) || 0;
  const childCount = Number(this.userobj.NoofChild) || 0;

  // Check if adults is 0
  if (adultCount === 0) {
    this.showError = true;
    this.errorMessage = '❌ At least 1 adult is required';
    this.result = null;
    return;
  }

  const rateAdult = this.productDetails?.adultBaseprice;
  const rateChild = this.productDetails?.kidsBaseprice;
  const discountPercentage = this.productDetails?.discountPercentage || 0;
  const maxQuantity = Number(this.productDetails?.quantity) || 0;

  if (!rateAdult || !rateChild) {
    alert("Adult or Child rate is missing!");
    return;
  }

  const totalPeople = adultCount + childCount;
  if (maxQuantity && totalPeople > maxQuantity) {
    this.showError = true;
    this.errorMessage = `❌ Only ${maxQuantity} people allowed. You selected ${totalPeople}.`;
  } else {
    this.showError = false;
    this.errorMessage = '';
  }

  const totalAdult = adultCount * rateAdult;
  const totalChild = childCount * rateChild;
  const total = totalAdult + totalChild;

  const discount = (total * discountPercentage) / 100;
  const finalTotal = total - discount;

  this.result = Math.round(finalTotal);
  this.userobj.Total = this.result;
  this.userobj.UsedAdultRate = rateAdult;
  this.userobj.UsedChildRate = rateChild;

  this.depsrv.setFormData(this.userobj);
}






isFormComplete(): boolean {
  return (
    this.userobj.Date &&
    this.userobj.NoofAdult &&  // Ensures at least 1 adult
    this.userobj.Transfer &&
    (this.userobj.NoofChild || this.userobj.NoofChild === 0)  // Allows 0 children
  );
}
}
