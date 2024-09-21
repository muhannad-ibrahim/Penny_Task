import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private authService: AuthService, private router: Router) {}

  onForgetPassword() {
    this.authService.sendPasswordReset(this.email).subscribe({
      next: (res) => console.log('Password reset email sent', res),
      error: (err) => console.error('Error sending reset email', err),
    });
    this.router.navigate(['/auth/reset-password']);
  }
}