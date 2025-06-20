import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

interface Product {
  _id: number;
  id: number;
  cityName: string;
  price: number;
  cityImage: string;
  imageUrl: string;
  citydescription: string;
  producttitle: string;
  title: string;
  thumbnail: string[];
  categorie: string; // Ensure this is included in your Product interface
}

@Component({
  selector: 'app-citydetails',
  imports: [CommonModule, RouterLink,NgxSkeletonLoaderModule],
  templateUrl: './citydetails.component.html',
  styleUrl: './citydetails.component.css'
})
export class CitydetailsComponent implements OnInit {

  deplist: any[] = [];
  products: Product[] = [];
  displayedProducts: Product[] = [];
  uniqueCategories: string[] = []; // Changed from uniqueProductTitles to uniqueCategories
  selectedCategories: string[] = []; // Changed from selectedProductTitles to selectedCategories
  skeletonArray: number[] = [];
  isloader: boolean = false;
  cityName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.generateSkeletons(8); // or any default expected count

    this.cityName = this.route.snapshot.queryParamMap.get('cityName');
    if (this.cityName) {
      this.fetchCityDetails();
    }

  }
  generateSkeletons(count: number) {
    this.skeletonArray = Array(count).fill(0);
  }

  icons = [
    { icon: 'fas fa-pencil-alt', text: 'Description', bgColor: 'bg-red-500' },
    { icon: 'fas fa-plus', text: 'Inclusion', bgColor: 'bg-yellow-500' },
    { icon: 'fas fa-clock', text: 'Timings', bgColor: 'bg-blue-500' },
    { icon: 'fas fa-info', text: 'Useful Info', bgColor: 'bg-orange-500' },
  ];

  fetchCityDetails() {
    this.isloader = true;
    this.generateSkeletons(8); 
    this.http.get<any>(`http://localhost:4000/api/city?cityName=${this.cityName}`).subscribe((response) => {
      this.products = response.producte.map((product: Product) => ({
        id: product.id,
        _id: product._id,
        cityName: product.cityName,
        price: product.price,
        citydescription: product.citydescription,
        producttitle: product.producttitle,
        categorie: product.categorie,
        imageUrl: this.sanitizer.bypassSecurityTrustUrl(`http://localhost:4000/uploads/${product.thumbnail[0]}`),
      }));
      this.isloader = false;
      this.displayedProducts = [...this.products];
      this.uniqueCategories = [...new Set(this.products.map(product => product.categorie))];
    });
  }
  

  onCategoryFilterChange(event: any) {
    const category = event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedCategories.length === 0) {
      this.displayedProducts = [...this.products];
    } else {
      this.displayedProducts = this.products.filter(product => this.selectedCategories.includes(product.categorie));
    }
  }

  getCategoryCount(category: string): number {
    return this.products.filter(product => product.categorie === category).length;
  }



  checkbox: boolean = true;

  toggleCheckbox(): void {
    this.checkbox = !this.checkbox;
  }
  checkbox2: boolean = true;

  toggleCheckbox2(): void {
    this.checkbox2 = !this.checkbox2;
  }
}
