import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  // login(params: any): Observable<any> {
  //   return this.apiService.post('auth/login', params);
  // }

  verifyToken(token: any): Observable<any> {
    return this.apiService.post('auth/verify-token', { token });
  }

  resetPassword(params: any): Observable<any> {
    return this.apiService.post('auth/reset-password', params);
  }
  // signUp(params: any): Observable<any> {
  //   return this.apiService.post('users/create-user', params);
  // }

  sendResetPasswordEmail(params: any): Observable<any> {
    return this.apiService.post('auth/send-reset-password-email', params);
  }
  getLinkedinToken(params: any): Observable<any> {
    return this.apiService.post('auth/get-linkedin-token', params);
  }



}
