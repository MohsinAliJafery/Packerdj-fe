import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class CoachTypeService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  addType(params: any): Observable<any> {
    return this.apiService.post(`coachTypes/create-type`, params);
  }

  updateType(params: any): Observable<any> {
    return this.apiService.put(`coachTypes/update-type/${params._id}`, params);
  }

  getTypeById(id: any): Observable<any> {
    return this.apiService.get(`coachTypes/get-type-by-id/${id}`);
  }

  getTypes(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`coachTypes/get-types?rows=${rows}&page=${page}`, params);
  }

  deleteType(id: any): Observable<any> {
    return this.apiService.delete(`coachTypes/delete-type/${id}`);
  }
}
