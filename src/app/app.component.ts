import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { NavbardropdownComponent } from "./navbardropdown/navbardropdown.component";
import { CardsliderComponent } from "./cardslider/cardslider.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'YallahDubaiTourism';
}
