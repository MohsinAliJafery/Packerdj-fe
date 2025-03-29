import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

let google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fb: any;
  signupForm!: FormGroup;
  componentInView = new Subject();
  user: any;
  loggedIn: any;
  client_id: String = '77ie66t95r3zxv';
  redirect_uri: String = encodeURI("https://pekerdja.co/auth/login");
  scope: String = 'r_liteprofile%20r_emailaddress%20w_member_social';
  url!: String;
  linkedInToken: any;

  constructor(
    private formBuilder: FormBuilder,
    private SocialauthService: SocialAuthService,
    private auth_service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private user_service: UserService
  ) { }

  ngOnInit(): void {
    this.url = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=some-random-string&scope=r_liteprofile%20r_emailaddress`;
    this.linkedInToken = this.route.snapshot.queryParams['code'];
    if (this.linkedInToken) {
      const params = {
        grant_type: 'authorization_code',
        code: this.linkedInToken,
        redirect_uri: this.redirect_uri,
      };

      this.getLinkedinUserDetails(params);
    }

    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(18),
          ],
        ],
        conPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator('password', 'conPassword'),
      }
    );

    this.SocialauthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.user_service
        .externalSignin(this.user)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigateByUrl('public/public-dashboard/update-profile');
            this.toastr.success(response.message);
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
    });
  }

  get getValue(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  getLinkedinUserDetails(params: any) {
    this.auth_service
      .getLinkedinToken(params)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          if (response.result == 1) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigateByUrl('public/public-dashboard/update-profile');
            this.toastr.success(response.message);
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
  }

  Register() {
    if (this.signupForm.valid) {
      if (
        this.signupForm.value.password !== this.signupForm.value.conPassword
      ) {
        this.toastr.error('Password does not match!', 'Error !!');
        return;
      }

      this.user_service
        .addUser(this.signupForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.router.navigate(['/auth/login']);
            }
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
    } else {
      if (this.signupForm.controls['email'].hasError('email')) {
        this.toastr.error('Email is invalid!', 'Error !!');
        return;
      }

      if (this.signupForm.controls['password'].hasError('minlength')) {
        this.toastr.error(
          'Password should be at least 8 characters long!',
          'Error !!'
        );
        return;
      }
      this.signupForm.markAllAsTouched();
      this.toastr.error('Provide all details!', 'Error !!');
    }
  }

  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['passwordMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onGoogleSignIn(event: any): void {
    const credential = event.idToken;
  }

}
