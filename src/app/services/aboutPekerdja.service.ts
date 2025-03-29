import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutPekerdjaService {
  apiURL = environment.API_URL;
  constructor(private apiService: ApiService) { }

  updateData(params: any, id: any): Observable<any> {
    return this.apiService.put(`aboutPekerdja/update-data/${id}`, params);
  }

  getData(params = null): Observable<any> {
    return this.apiService.get(`aboutPekerdja/get-data`, params);
  }

  getDataById(id: any): Observable<any> {
    return this.apiService.get(`aboutPekerdja/get-data-by-id/${id}`);
  }


}
