import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: { firstname: string; lastname: string } = { firstname: '', lastname: '' };

  constructor(private router: Router,private authService: AuthService) { }

 decodeToken(token: string): { firstname: string; lastname: string } {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { firstname: payload.firstname, lastname: payload.lastname };
  }

ngOnInit() {
  const token = this.authService.getToken();
  if (token) {
    const { firstname, lastname } = this.decodeToken(token);
    this.user = { firstname, lastname };
  } else {
    this.router.navigate(['/login']); // หากไม่มี token ให้กลับไปที่หน้า login
  }
}

  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
  }
  
}
