import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth/login'; // URL ของ API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.post(this.apiUrl, { email, password }).subscribe(
        (response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // เก็บ token ใน localStorage
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }


  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000); // เวลาปัจจุบันในวินาที
    return payload.exp < currentTime;
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    // ตรวจสอบว่า token หมดอายุหรือไม่
    if (token && this.isTokenExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  }

  logout(): void {
    localStorage.removeItem('token'); // ลบ token เมื่อออกจากระบบ
  }
}