import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiURL = environment.API_URL;
  constructor(private apiService: ApiService) { }

  updateEmail(params: any, id: any): Observable<any> {
    return this.apiService.put(`emails/update-email/${id}`, params);
  }

  getEmails(): Observable<any> {
    return this.apiService.get(`emails/get-emails`);
  }

  getEmailById(id: any): Observable<any> {
    return this.apiService.get(`emails/get-email-by-id/${id}`);
  }


}
