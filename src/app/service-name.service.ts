import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './adminservice.service';


export interface ProductResponse {
  product?: Product; // The 'product' property may or may not exist
  products?: Product[]; // Or 'products' which would be an array of products
}



@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {

  constructor(private http: HttpClient) { }

  getproductDepartment(id?: string): Observable<ProductResponse> {
    if (id) {
      return this.http.get<ProductResponse>(`http://localhost:4000/api/product?id=${id}`);
    } else {
      return this.http.get<ProductResponse>(`http://localhost:4000/api/home`);
    }
  }
  



  getproductDepartment2() {
    return this.http.get("https://api.escuelajs.co/api/v1/products");
  }


  private formDataSubject = new BehaviorSubject<any>(null);  
  formData$ = this.formDataSubject.asObservable(); 

  updateFormData(data: any) {
    this.formDataSubject.next(data);  // Emit new data
  }

          // form

 private formData: any = {};  
 
// private formData: any;
private productData: any; 

setFormData(data: any) {
  this.formData = data;
}

getFormData() {
  return this.formData;
}

setProductData(data: any) {
  this.productData = data;
}

getProductData() {
  return this.productData;
}





  private savedProducts: any[] = [];
  private savedCount: number = 8;

  setProducts(products: any[]) {
    this.savedProducts = products;
  }

  getProducts() {
    return this.savedProducts;
  }

  setCount(count: number) {
    this.savedCount = count;
  }

  getCount() {
    return this.savedCount;
  }










}
