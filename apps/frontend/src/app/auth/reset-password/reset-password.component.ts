import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  newPassword = '';
  token = '';

  constructor(private authService: AuthService, private router: Router) {}

  onResetPassword() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (res) => console.log('Password successfully reset', res),
      error: (err) => console.error('Error resetting password', err),
    });
    this.router.navigate(['/auth/login']);
  }
}