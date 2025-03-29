import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'login/:token/:id',
    component: LoginComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  {
    path: 'reset-password/:token/:id',
    component: ResetPasswordComponent
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
