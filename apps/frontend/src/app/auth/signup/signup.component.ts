import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.email, this.password).subscribe(
      (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/auth/login']);  // Redirect to login page
      },
      (error) => {
        console.error('Signup error', error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
