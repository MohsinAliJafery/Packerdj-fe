import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  showPassword: boolean = false;
  isLoginfailed: boolean = false;
  componentInView = new Subject;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private user_service: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = this.passwordInput.nativeElement;

    if (this.showPassword) {
      this.renderer.setAttribute(passwordInput, 'type', 'text');
    } else {
      this.renderer.setAttribute(passwordInput, 'type', 'password');
    }
  }

  onClick() {
    if (this.loginForm.valid) {

      this.user_service
        .getUserByRole(this.loginForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            this.toastr.success(response.message);
            if (response.user?.profile?.resumes) {
              delete response.user?.profile?.resumes;
            }
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/admin/dashboard/candidate']);
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );

    }
    else {
      this.loginForm.markAllAsTouched();
      this.isLoginfailed = true;
      setTimeout(() => {
        this.isLoginfailed = false;
      }, 1000);
    }
  }
}

