import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SingupService } from '../api/singup.service';

@Component({
  selector: 'app-sinup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent {
  constructor(private router: Router, private singupService: SingupService) {}

  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  signup() {
    if (this.signupForm.valid) {
      const data = this.signupForm.value;
      this.singupService.submitForm(data);
      console.log(data);
      this.router.navigateByUrl("/login")
      
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
