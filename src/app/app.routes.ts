import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CitydetailsComponent } from './citydetails/citydetails.component';
import { NavTourComponent } from './nav-tour/nav-tour.component';
import { NavAboutusComponent } from './nav-aboutus/nav-aboutus.component';
import { ReasonBookComponent } from './reason-book/reason-book.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { LoginComponent } from './login/login.component';
import { SinupComponent } from './sinup/sinup.component';
import { InvalidComponent } from './invalid/invalid.component';
import { AdminComponent } from './admin/admin.component';

// Make sure this is 'export const routes'
export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'city', component: CitydetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sinup', component: SinupComponent },
  { path: 'main', component: MainComponent },
  { path: 'citytour', component: NavTourComponent },
  { path: 'aboutus', component:NavAboutusComponent  },
  { path: 'invalid', component:InvalidComponent  },
  { path: 'admin', component:AdminComponent  },
  { path: 'Product_details', component:ReasonBookComponent  },
  { path: 'producttable/:_id', component: ProducttableComponent },

];
