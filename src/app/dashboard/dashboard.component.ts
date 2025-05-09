import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  constructor(private router: Router) { }
}
