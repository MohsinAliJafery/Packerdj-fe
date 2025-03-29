import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class FaqsService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) { }

  addFaqs(params: any): Observable<any> {
    return this.apiService.post(`faqs/create-faqs`, params);
  }

  updateFaqs(params: any): Observable<any> {
    return this.apiService.put(`faqs/update-faqs/${params._id}`, params);
  }

  getFaqs(params = null): Observable<any> {
    return this.apiService.get(`faqs/get-faqs`, params);
  }

}
