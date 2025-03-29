import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  form!: FormGroup;
  componentInView = new Subject();
  constructor(private formBuilder: FormBuilder,
    private auth_service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  Reset() {

    if (this.form.valid) {
      this.auth_service.sendResetPasswordEmail(this.form.value).pipe(takeUntil(this.componentInView)).subscribe(response => {
        this.toastr.success(response.message);
        this.router.navigate(['/auth/login']);
      }, error => {
        this.toastr.error(error.error.message);
      });
    }
    else {
      this.toastr.error('Provide valid email', 'Error')
    }
  }
}
