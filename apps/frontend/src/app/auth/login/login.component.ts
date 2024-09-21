import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe((response) => {
      const tokenResponse = response as { access_token: string };
      const token = tokenResponse.access_token;
      const expiresAt = new Date().getTime() + 8 * 60 * 60 * 1000;
      
      localStorage.setItem('token', token);
      localStorage.setItem('expires_at', expiresAt.toString());
      this.router.navigate(['/dashboard']);

      this.authService.autoLogout();
    },
    (error) => {
      console.error('Login error', error);
    }
  );
  }

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  forgetPassword(){
    this.router.navigate(['/auth/forgot-password']);
  }
}
