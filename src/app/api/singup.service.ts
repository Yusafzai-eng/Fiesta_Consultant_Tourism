import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(private http:HttpClient) { }

  Singup:string='http://localhost:4000/signup'
   
  submitForm(data: any) {
  this.http.post(this.Singup, data).subscribe({
    next: (res: any) => {
      console.warn('Response:', res);

      // Agar token response mein milta hai
      if (res.token) {
        console.log('Access Token:', res.token);

        // Optional: Token ko localStorage mein store kar sakte ho
        localStorage.setItem('token', res.token);
      }
    },
    error: (err) => {
      console.error('Signup Error:', err);
    }
  });
}



}
