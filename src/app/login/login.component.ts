// login.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../loginapi/login.service';
import { HttpClient } from '@angular/common/http'; // ✅ ADD

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { // ✅ implements OnInit

  constructor(
    private router: Router,
    private LoginService: LoginService,
    private http: HttpClient // ✅ ADD
  ) {}

  // ✅ RUN THIS ON LOAD
  ngOnInit(): void {
    console.log('ngOnInit triggered'); // for testing
    this.http.get('http://localhost:4000/api/verify-token', {
      withCredentials: true
    }).subscribe({
      next: (res: any) => {
        console.log('Token valid:', res);
        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'user') {
          this.router.navigate(['/main']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error: any) => {
        console.log('Token invalid or expired:', error);
        // token not valid, stay on login page
      }
    });
  }

  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  login(data: any): void {
    if (this.loginform.valid) {
      this.LoginService.submitform(data).subscribe(
        (res: any) => {
          console.warn('Full Response:', res);
          alert('Login successful');

          const returnUrl = localStorage.getItem('returnUrl');
          localStorage.removeItem('returnUrl');

          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            if (res.role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (res.role === 'user') {
              this.router.navigate(['/main']);
            } else {
              alert('Unknown role');
            }
          }
        },
        (error) => {
          alert('Login failed');
          console.error('Error:', error);
        }
      );
    } else {
      alert('Form sahi se fill karo');
    }
  }
}
