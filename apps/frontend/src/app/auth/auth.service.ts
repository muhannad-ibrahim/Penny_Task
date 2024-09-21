/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';  // Backend API URL

  constructor(private http: HttpClient, private router: Router) {}
  
  signup(email: string, password: string): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/user/signup`, { email, password });
  }

  login(email: string, password: string ): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/user/login`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDecodedToken() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getLoggedInUser() {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? (decodedToken as any).email : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiresAt = parseInt(localStorage.getItem('expires_at') || '0');

    return !!token && new Date().getTime() < expiresAt;
  }
  
  sendPasswordReset(email: string) {
    return this.http.post(`${this.apiUrl}/user/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/user/reset-password`, { token, newPassword });
  }

  autoLogout() {
    const expiresAt = parseInt(localStorage.getItem('expires_at') || '0');
    const timeLeft = expiresAt - new Date().getTime();

    // Auto logout after token expiration
    setTimeout(() => {
      this.logout();
      console.log('Session expired. Logged out automatically.');
    }, timeLeft);
  }
}
