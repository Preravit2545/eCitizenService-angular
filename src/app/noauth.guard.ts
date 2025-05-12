// auth.guard.ts (Auth Guard ที่ใช้ป้องกันหน้า Login)
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // ดึง JWT Token จาก Local Storage
    if (token) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
