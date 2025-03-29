import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  post(api: string, params: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}${api}`, params);
  }

  put(api: string, params: any): Observable<any> {
    return this.httpClient.put(`${this.apiURL}${api}`, params);
  }

  get(api: string, params?: any): Observable<any> {
    if (params) {
      return this.httpClient.get(`${this.apiURL}${api}`, { params });
    }
    return this.httpClient.get(`${this.apiURL}${api}`);
  }


  delete(api: string): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}${api}`);
  }

}
