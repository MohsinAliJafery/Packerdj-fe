import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form!: FormGroup;
  componentInView = new Subject();
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  showPassword: boolean = false;
  id: any;
  token: any;

  constructor(
    private toastr: ToastrService,
    private auth_service: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    localStorage.clear();
    this.activatedRoute.params.pipe(takeUntil(this.componentInView)).subscribe(params => {
      if (params && params['token'] && params['id']) {
        this.verifyToken(params['token']);
        this.id = params['id']
      }

      if (!params || (params && (!params['token'] || !params['id']))) {
        this.router.navigate(['/auth/login']).then();
      }
    });


    this.form = this.formBuilder.group({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  verifyToken(token: any): void {
    this.auth_service.verifyToken(token).pipe(takeUntil(this.componentInView)).subscribe(() => {
      this.token = token;
    }, error => {
      this.router.navigate(['/auth/login']).then();
      this.toastr.error(error.error.message);
    })
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


  onResetPasswordClicked(): void {

    const formValue = this.form.value;
    const params = {
      id: this.id,
      token: this.token,
      password: formValue.password
    };
    if (this.form.valid) {
      this.auth_service.resetPassword(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
        this.toastr.success(response.message);
        this.router.navigate(['/auth/login']).then();
      }, error => {
        this.toastr.error(error.error.message);
      });
    }
    else {
      this.toastr.error('Provide valid password', 'Error')
    }
  }


}
