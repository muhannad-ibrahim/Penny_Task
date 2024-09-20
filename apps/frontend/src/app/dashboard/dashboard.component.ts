/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  items: any[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const token = this.authService.getToken();
    if (token) {
      this.http.get('http://localhost:3000/api/data', {
        headers: { Authorization: `Bearer ${token}` },
      }).subscribe(
        (data: any) => {
          this.items = data;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    }
  }

  logout() {
    this.authService.logout();
  }
}
