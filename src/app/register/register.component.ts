import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  statusMessage: string = ''; // เพิ่มตัวแปรสำหรับข้อความสถานะ

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.statusMessage = 'กำลังลงทะเบียน...'; // แสดงข้อความสถานะ
      this.http.post('http://localhost:4000/api/auth/register', this.registerForm.value).subscribe(
        () => {
          this.statusMessage = 'ลงทะเบียนสำเร็จ!'; // แสดงข้อความสำเร็จ
          setTimeout(() => {
            this.router.navigate(['/login']); // นำผู้ใช้ไปที่หน้า Login หลังจาก 2 วินาที
          }, 2000);
        },
        (error) => {
          console.error(error);
          this.statusMessage = 'เกิดข้อผิดพลาดในการลงทะเบียน'; // แสดงข้อความข้อผิดพลาด
        }
      );
    }
  }
}

