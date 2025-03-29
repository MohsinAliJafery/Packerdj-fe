import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  componentInView = new Subject();
  user: any;
  loggedIn: any;
  client_id: String = '77ie66t95r3zxv';
  redirect_uri: String = encodeURI("https://pekerdja.co/auth/login");
  scope: String = "r_liteprofile%20r_emailaddress%20w_member_social"
  url!: String;
  linkedInToken: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService, private auth_service: AuthService, private user_service: UserService, private authService: SocialAuthService) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.url = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=some-random-string&scope=r_liteprofile%20r_emailaddress`;
    this.linkedInToken = this.route.snapshot.queryParams["code"];
    if (this.linkedInToken) {
      const params = {
        grant_type: "authorization_code",
        code: this.linkedInToken,
        redirect_uri: this.redirect_uri,

      }

      this.getLinkedinUserDetails(params);
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      this.user_service.externalSignin(this.user)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.toastr.success(response.message);
            this.router.navigateByUrl('public/public-dashboard/update-profile')
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );

    });

  }

  getLinkedinUserDetails(params: any) {
    this.auth_service.getLinkedinToken(params)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          if (response.result == 1) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigateByUrl('public/public-dashboard/update-profile')
            this.toastr.success(response.message);
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
  }


  Login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      this.toastr.error('Provide all details', 'Error !!');
    }
    else {
      this.user_service.getUserByEmail(this.loginForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              if (response.user?.profile?.resumes) {
                delete response.user?.profile?.resumes;
              }
              localStorage.setItem('user', JSON.stringify(response.user));
              let job_id: any = localStorage.getItem('job_id');
              let id = JSON.parse(job_id);
              localStorage.removeItem('job_id');
              if (id) {
                this.router.navigate(['/public/public-dashboard/job-detail/'], { queryParams: { id } });
              }
              else {
                this.router.navigateByUrl('public/public-dashboard/update-profile')
              }
            }

          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
    }
  }
  onGoogleSignIn(event: any): void {
    const credential = event.idToken;
  }

}
