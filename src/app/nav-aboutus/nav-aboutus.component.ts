import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-aboutus',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav-aboutus.component.html',
  styleUrl: './nav-aboutus.component.css'
})
export class NavAboutusComponent {


  ngOnInit(): void {
    window.scrollTo(0, 0); // Scroll top pe reset hoga
  }






  services = [
    'Desert Safari Tour',
    'OverNight Desert Safari',
    'Hummer Desert Safari',
    'Dubai City Tour',
    'Abu Dhabi City Tour',
    'Al Ain City Tour',
    'Sharjah / Ajman City Tour',
    'East Coast Tour',
    'Ferrari World Tour',
    'Dhow Cruise Booking Special',
    'Hatta Mountain Adventure',
    'Musandam Adventure',
    'Sea Wings',
    'Burj Khalifa Ticket Booking',
    'Hot Air Balloon Tour',
    'Helicopter Tour',
    'Dolphin Show',
    'Airport Pick up & Drop Service',
  ];



paragraph:string='  Why waste time on planning your tour to various destinations in Dubai? You can be at peace of mind and let us take the worry of taking you around the Arab Emirates in style and hustle free. DubaiTravel Tourism is one of a kind when it comes to providing the visitors with the best adventures in UAE. Who doesn tlove skyscrapers, high-rise building, and culture altogether? If you find yourself in UAE may it be one day or a week, Dubai Travel Tourism is always there to provide you the unsurpassed Dubai city tour. From the World of Adventures including Ferrari World, IMG World of Adventures, Bollywood Parks to themed parks including Bollywood Parks, Legoland, and Riverland Dubai, we offer the most thrilling and adventurous tours across UAE.'

paragraph2:string='  Economical tours are our distinction and we are honored by it. Want to take a ride out of Dubai hustle and bustle? Dubai Travel Tourism is offering one of the best deals in desert safaris and you can pick up the one that suits you. It includes morning, evening and night desert safari that come along with some variations containing Hummer, Camel, and Royal VIP Desert Safari exclusively for you. We deliver only the unsurpassed services to our customers give them once in a lifetime traveling experience theyll remember for their lifetime. The feedback ofour customers is a testimony to that. With the satisfaction rate of 90% +/- we are leading from the front. We guarantee the clients of providing the highest quality experience with the lowest cost. So whats the wait for? Book one of our dealsand live in the moment that youll remember for your life and roam around anywhere in UAE with one of the best rated Holliday Packages that we offer. Feel free to contact our tour operators and organizers for any queries.'






text: { label: string }[] = [
  {
    label: "Our team of Dubai Travel Tourism is obsessed with finding the best adventures and tours for you in UAE. From Dubai to Abu Dhabi to Fujairah, from adventure tours to traditional, we guarantee a lifetime experience. Our customer feedback proves that we provide one of the best Holiday Packages Dubai has ever offered."
  },
  {
    label: "Planning to Dubai Travel Tourism? Why start anywhere else than us. No doubt, we offer the most economical Dubai tour package  for all our worthy costumes. Moreover, Our Dubai Excursions mix modern culture with history, adventure with world-class shopping and entertainment. You just have to Dubai Travel Tourism on our website or contact the Tour operator in Dubai."
  },
  {
    label: "Apart from Dubai Tour Package, indeed we offer Amazing packages for Abu Dhabi, Fujairah, Sharjah, and Ajman too. From an action pack Desert safari to traditional desert camping, we deal in all holiday Packages Dubai has ever offered. Furthermore, we ensure a VIP protocol for all customers who book us on Dubai Excursions or any other Emirates four."
  },
  {
    label: "In addition to that, many of our deals cant be found anywhere else. Save time and Book Dubai Tour and Travels for entertaining yourself with great stuff at allowing price. Moreover, our Tour operators in Dubai make sure at any rate that your booking process remains easy and comfortable."
  },
  {
    label: "So what are you waiting for? Dubai Travel Tourism or a tour anywhere in UAE from the best rated Holiday Packages Dubai Travel Tourism has offered. Feel free to contact our Tour operators in Dubai for more details."
  }
];













}
