import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpParams } from "@angular/common/http";
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService, private socialAuthService: SocialAuthService,
  ) {
  }

  addUser(params: any): Observable<any> {
    return this.apiService.post(`users/create-user`, params);
  }

  updateUser(params: any, file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('firstName', params.firstName);
    formData.append('lastName', params.lastName);
    formData.append('gender', params.gender);
    formData.append('bio', params.bio);
    if (file != undefined) {
      formData.append('file', file[0]);
    }
    return this.apiService.put(`users/update-user/${params._id}`, formData);
  }
  updateUserResume(id: any, file: any): Observable<any> {
    const formData: FormData = new FormData();
    if (file != undefined) {
      formData.append('file', file);
    }
    return this.apiService.put(`users/update-user-resume/${id}`, formData);
  }

  getUserById(id: any): Observable<any> {
    return this.apiService.get(`users/get-user-by-id/${id}`);
  }
  getUserResume(id: any): Observable<any> {
    return this.apiService.get(`users/get-user-resume/${id}`, { observe: 'response', responseType: 'blob' });
  }
  getUserByEmail(params: any): Observable<any> {
    return this.apiService.post(`users/get-user-by-email`, params);
  }
  getUserByRole(params: any): Observable<any> {
    return this.apiService.post(`users/get-user-by-role`, params);
  }
  externalSignin(params: any): Observable<any> {
    return this.apiService.post(`users/google-signin`, params);
  }
  // getResumeFile(params: any): Observable<any> {
  //   return this.apiService.post(`users/get-resume-file`, params);
  // }


}
