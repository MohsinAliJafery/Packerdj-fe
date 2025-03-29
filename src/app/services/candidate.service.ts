import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) { }


  getUserByid(id: any): Observable<any> {
    return this.apiService.get(`users/get-user-details/${id}`);
  }

  getUser(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`users/get-users?rows=${rows}&page=${page}`, params);
  }

  getAllUsersData(): Observable<any> {
    return this.apiService.get(`users/get-allusers-data`);
  }

}
