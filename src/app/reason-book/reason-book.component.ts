import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reason-book',
  imports: [CommonModule],
  templateUrl: './reason-book.component.html',
  styleUrl: './reason-book.component.css',
})
export class ReasonBookComponent {
  features = [
    {
      icon: 'fa-shield',
      color: 'text-orange-400',
      title: 'BEST PRICE GUARANTEE',
    },
    {
      icon: 'fas fa-comments',
      color: 'text-green-500',
      title: '24X7 LIVE CHAT SUPPORT',
    },
    { icon: 'fa-bookmark', color: 'text-blue-500', title: 'FAST BOOKING' },
    { icon: 'fas fa-star', color: 'text-red-500', title: '5 STAR FACILITIES' },
    { icon: 'fa-wifi', color: 'text-orange-400', title: 'WIFI COMING SOON' },
  ];

  description = `In vel aliquet tellus. Nunc lacinia tincidunt justo sit amet pharetra. In non ipsum ac velit porttitor bibendum. Praesent quis ornare neque, ut tempor metus. Donec elementum viverra ligula vel tincidunt. Fusce pellentesque efficitur erat. Aliquam sit amet nunc at tortor placerat faucibus vel vitae mi. Proin dapibus, neque at dignissim accumsan, erat nisi luctus est, in sagittis nulla enim ac tellus. Mauris a ligula efficitur, facilisis dolor sed, sagittis ante. Vestibulum vitae nunc volutpat, vestibulum turpis quis, tristique velit.`;
}
