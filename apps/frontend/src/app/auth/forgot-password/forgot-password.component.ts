import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private authService: AuthService) {}

  onResetPassword() {
    this.authService.sendPasswordReset(this.email).subscribe({
      next: (res) => console.log('Password reset email sent', res),
      error: (err) => console.error('Error sending reset email', err),
    });
  }
}