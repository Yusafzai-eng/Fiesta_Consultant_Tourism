import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  openWhatsApp() {
    window.open('https://wa.me/971545404171', '_blank');
  }
  
  menuOpen = false;
  isMenuOpen = false;

  // Toggle methods
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMenu2() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Close menu method
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Social Links
  socialLinks = [
    { href: 'https://pk.linkedin.com/company/fiesta-consultants', bgColor: 'bg-blue-700', iconClass: 'fab fa-linkedin-in' },
    { href: 'https://www.facebook.com/FiestaConsultants/', bgColor: 'bg-blue-500', iconClass: 'fab fa-facebook-f' },
    { href: 'https://x.com/i/flow/login?redirect_after_login=%2Fsearch%3Fq%3D%2523HospitalityConsultant%26src%3Dhashtag_click', bgColor: 'bg-blue-400', iconClass: 'fab fa-twitter' },
    { href: 'https://www.youtube.com/results?search_query=fiesta+consultant', bgColor: 'bg-red-600', iconClass: 'fab fa-youtube' },
    { href: 'https://wa.me/971545404171', bgColor: 'bg-green-500', iconClass: 'fab fa-whatsapp' },
  ];

  // Navigation Links
  links = [
    { label: 'NEW YEAR EVENTS', path:'http://localhost:4200/city?cityName=NEW%20YEAR%20EVENTS' },
    { label: 'SAFARI TOURS', path: 'http://localhost:4200/city?cityName=SAFARI%20TOURS' },
    { label: 'COMBO DEALS', path: 'http://localhost:4200/city?cityName=COMBO%20DEALS' },
    { label: 'SEA ADVENTURES', path: 'http://localhost:4200/city?cityName=CITY%20TOURS' },
    { label: 'CITY TOURS', path: 'http://localhost:4200/city?cityName=CITY%20TOURS' },
    { label: 'DHOW CRUISE', path: 'http://localhost:4200/city?cityName=DHOW%20CRUISE' },
  ];



  menuItems = [
    { label: 'Home', action: () => this.closeMenu() },
    { label: 'About', action: () => this.closeMenu() },
    { label: 'Log In', action: () => this.closeMenu() },
    { label: 'Package', action: () => this.closeMenu() },
    { label: 'Corporate', action: () => this.closeMenu() },
    { label: 'Local Guide', action: () => this.closeMenu() }
  ];

  // Method to close the menu

  menuLinks = [
    { name: 'Tours', href: 'citytour' },
    { name: 'About us', href: 'aboutus' },
    { name: 'Corporate', href: 'corporate' },
    { name: 'Packages', href: 'packages' },
    { name: 'LogIn', href: 'login' },
    { name: 'Local Guide', href: '' },
  ];
  
  contactInfo = [
    {
      icon: 'fa-solid fa-phone rotate-45 text-xs text-pink-600',
      label: '+971 54 540 4171',
      class: 'text-pink-700 font-bold text-xs sm:text-sm mt-1 hover:text-indigo-950',
    },
    {
      icon: 'fa-brands fa-whatsapp text-green-700 text-lg',
      label: '+971 54 540 4171',
      class: 'text-pink-700 font-bold text-sm sm:text-sm hover:text-indigo-950',
    },
  ];

  // Additional Info
  additionalInfo = [
    {
      icon: 'fa-solid fa-envelope text-pink-700',
      label: 'inquiryubaitravelotourism.com',
      class: 'text-pink-700 hover:text-indigo-950 font-bold text-sm sm:text-sm',
    },
    {
      icon: 'fa-solid fa-bullseye text-green-600',
      iconCount: 5, // Number of bullseye icons
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSduKfXoMWOmScspj3hXVYULnzXNvRbWiKV-Q&s',
      class: 'mt- w-28',
    },
  ];
}
