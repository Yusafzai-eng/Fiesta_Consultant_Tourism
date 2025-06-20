import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbardropdown',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbardropdown.component.html',
  styleUrl: './navbardropdown.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbardropdownComponent  {

  defaultSlides = [
    {
      img: 'https://imagedelivery.net/SwMP4f7rTNZkFOn4O9xPmg/54b896de-2b15-49d9-47f9-df61643d8f00/width=1600',
      alt: 'Rewards Bonanza',
    },
    {
      img: 'https://imagedelivery.net/SwMP4f7rTNZkFOn4O9xPmg/1ea10043-d141-427c-0b0a-175b8ce01600/public',
      alt: '9 AED Offer',
    },
    {
      img: 'https://imagedelivery.net/SwMP4f7rTNZkFOn4O9xPmg/c215efca-d7cf-42a6-8555-0db3daf1d600/public',
      alt: '9 AED Offer',
    },
  ];

  @Input() slides: { img: string; alt: string }[] = this.defaultSlides;




  features = [
    { icon: 'fas fa-tags text-red-600 rotate-45', text: 'BEST PRICE GUARANTEE', route: '/Product_details' },
    { icon: 'fas fa-comments text-green-600 text-2xl', text: '24X7 LIVE CHAT SUPPORT', route: '/Product_details' },
    { icon: 'fas fa-bookmark text-blue-600 text-2xl', text: 'FAST BOOKING', route: '/Product_details' },
    { icon: 'fas fa-star text-red-600 text-2xl', text: '5 STAR FACILITIES', route: '/Product_details' },
    { icon: 'fas fa-wifi text-blue-600 text-2xl', text: 'WIFI COMING SOON', route: '/Product_details' },
  ];















  
}

