import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import Swiper from 'swiper';

@Component({
  selector: 'app-local-guide',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './local-guide.component.html',
  styleUrls: ['./local-guide.component.css'] // ✅ use `styleUrls` (plural)
})
export class LocalGuideComponent implements OnInit {
  cities: Array<{ id: number, name: string, imageUrl: any, cityName: string }> = [];
  skeletonArray: number[] = [];
  isloader: boolean = false;
  private isBrowser: boolean;
  private swiperInitialized = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.generateSkeletons(4);
    this.fetchProductData();
  }

  generateSkeletons(count: number) {
    this.skeletonArray = Array(count).fill(0);
  }

  fetchProductData() {
    this.isloader = true;
    this.http.get<any>('http://localhost:4000/api/home').subscribe({
      next: (response) => {
        this.cities = response.distinctCities.map((product: any) => ({
          id: product.id,
          name: product.cityName,
          imageUrl: this.sanitizer.bypassSecurityTrustUrl(`http://localhost:4000/uploads/${product.cityImage}`),
          cityName: product.cityName
        }));
        this.isloader = false;
        setTimeout(() => this.initSwiper(), 100); // ⏳ small delay after data
      },
      error: (err) => {
        this.isloader = false;
        console.error('Error loading cities:', err);
      }
    });
  }

  initSwiper() {
    if (this.isBrowser && !this.swiperInitialized) {
      const wrapper = document.querySelector('.blogCategoriesSwiper .swiper-wrapper');
      if (wrapper && wrapper.children.length > 0) {
        new Swiper('.blogCategoriesSwiper', {
          loop: true,
          spaceBetween: 16,
          grabCursor: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }
        });
        this.swiperInitialized = true;
      }
    }
  }









para1:string=' At our company Dubai Travel and Tourism, we provide utmost care to our members who take out time from their busy schedule and engage themselves in attending meetings or tour which result in brand sponsoring. Therefore, our main aim is to ensure that every detail irrespectiveof its impact we keep it according to the standard benchmark. We regard our members as the most prized assets of our company as when they travel to attending the meeting it creates a positive effect on the company. Hence our relationships with our members are extremely valuable. We truly value the importance of each individual who reaches us. Therefore, we provide A-1 hospitality within our budget. Our crew of strong members is always available to provide the best customer care service to our clients. Our service is exceptional and we have solutions to your all queries. There is nothing as impossible for our crew to solve our client issues. We try our best to limit tariffs of the luxurious hotel to economical ones for our client convenience. We at Dubai Travel and Tourism do not believe in leaving clients unsure. For this reason, we try our best to settle all their issues and concerns- to provide excellent customer service to our clients is our topmost priority. We have made our application process pretty interesting and fast to keep our clients engaged. Additionally, our chain in India gives a wonderful opportunity to deal with hotels on annual commitment grounds. We have expanded our operations over the years in Asian countries. Especially UAE. Our meeting session comprises of most well-known professionals who carry ambitious attitude and enthusiasm for traveling - ho also deliver excellence, positive results and innovation in their assign projects. Our USP is high-class networking proficiency and coordination technique. We have complete command over our USP and it is unmatchable.'


  para2:string='We have a highly trained team; to design and execute the work in a most efficient manner. We provide a solution for your exhibition, booth design and fabrication. Our creative team works tirelessly to design your products as per your need and budget. Our facility also included air-conditioned setups & setting up a purchase point.'



   para3:string='We understand every little details and importance of your conference and seminars. So our team makes sure to work efficiently and pull out the successful event, whether its launch of a new brand to target potential client or to retain old clients, annual conference or any kind of informal meeting our team is ready to manage everything competently with no glitches.'


   para4:string='   We are offering one-stop solutions for your all needs to cater corporate events, Team meets up, award ceremony or a small get together. The experience which we have earned over the past years shows our goodwill, we are known among one of the best corporate event management company. Our team makes sure to satisfy customer requirements fully, from stage fabrication to perfect lighting and sound. For every single event, our team tries their best to come up with amazing ideas, along with a pocket-friendly budget. Whether its a team meet up plan, or any ceremony we can arrange all for you. Also, our main goal is to ensure smooth dealing, & friendly environment.'



}
