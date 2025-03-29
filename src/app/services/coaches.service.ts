import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {


  apiUrl = environment.API_URL
  showLoader = false;

  constructor(private apiService: ApiService) { }

  createCoach(params: any): Observable<any> {
    return this.apiService.post(`coaches/create-coach`, params);
  }

  updateCoach(params: any, id: any): Observable<any> {
    return this.apiService.put(`coaches/update-coach/${id}`, params);
  }

  getCoachByID(id: any): Observable<any> {
    return this.apiService.get(`coaches/get-coach-by-id/${id}`);
  }

  getCoaches(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`coaches/get-coaches?rows=${rows}&page=${page}`, params);
  }

  deleteCoach(id: any): Observable<any> {
    return this.apiService.delete(`coaches/delete-coach/${id}`);
  }

}
