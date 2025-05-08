import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Sending login request with:', { email, password });
      this.http.post<any>('http://localhost:4000/api/auth/login', { email, password }).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          alert('เข้าสู่ระบบสำเร็จ');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
        }
      });
    } else {
      this.errorMessage = 'โปรดกรอกข้อมูลให้ถูกต้อง';
    }
  }
}

