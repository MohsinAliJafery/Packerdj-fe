import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  apiUrl = environment.API_URL
  showLoader = false;

  constructor(private apiService: ApiService) { }

  createEmployer(params: any): Observable<any> {
    return this.apiService.post(`employers/create-employer`, params);
  }

  updateEmployer(params: any, id: any): Observable<any> {
    return this.apiService.put(`employers/update-employer/${id}`, params);
  }

  getEmployerByID(id: any): Observable<any> {
    return this.apiService.get(`employers/get-employer-by-id/${id}`);
  }

  getEmployers(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`employers/get-employers?rows=${rows}&page=${page}`, params);
  }
  getAllEmployersData(): Observable<any> {
    return this.apiService.get(`employers/get-allemployers-data`);
  }

  deleteEmployer(id: any): Observable<any> {
    return this.apiService.delete(`employers/delete-employer/${id}`);
  }
}
