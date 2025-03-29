import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  apiURL = environment.API_URL
  constructor(private apiService: ApiService) { }

  updateSetting(params: any): Observable<any> {
    return this.apiService.put(`settings/update-setting/${params._id}`, params);
  }

  getSettings(): Observable<any> {
    return this.apiService.get(`settings/get-settings`);
  }

}
