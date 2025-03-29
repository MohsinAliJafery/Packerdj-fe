import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class BookingService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  addBooking(params: any): Observable<any> {
    return this.apiService.post(`bookings/add-booking`, params);
  }
  getSessionsByUserId(id: any): Observable<any> {
    return this.apiService.get(`bookings/get-sessions-by-userId/${id}`);
  }
  getSessionsByCoachId(id: any): Observable<any> {
    return this.apiService.get(`bookings/get-sessions-by-coachId/${id}`);
  }
  getTransactions(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`bookings/get-transactions?rows=${rows}&page=${page}`, params);
  }
  generateMeetingLink(params: any): Observable<any> {
    return this.apiService.post(`bookings/generate-meeting-link`, params);
  }
}
