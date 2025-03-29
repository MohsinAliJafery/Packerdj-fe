import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  showPassword: boolean = false;
  isLoginfailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router
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
      this.router.navigate(['/admin/dashboard/candidate']);
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
