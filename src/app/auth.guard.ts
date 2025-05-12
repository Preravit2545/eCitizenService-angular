import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // ดึง JWT Token จาก Local Storage
    if (token) {
      return true; // อนุญาตให้เข้าถึงหน้าได้ถ้ามี Token
    } else {
      this.router.navigate(['/login']); // ถ้าไม่มี Token จะถูกนำไปที่หน้า Login
      return false;
    }
  }
}
