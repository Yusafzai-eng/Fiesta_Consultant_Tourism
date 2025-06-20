import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../loginapi/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private LoginService: LoginService) {}

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

        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'user') {
          this.router.navigate(['/main']);
        } else {
          alert('Unknown role');
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