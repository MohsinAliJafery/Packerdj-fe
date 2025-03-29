import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class JobCategoryService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  addCategory(params: any): Observable<any> {
    return this.apiService.post(`jobCategories/create-category`, params);
  }

  updateCategory(params: any): Observable<any> {
    return this.apiService.put(`jobCategories/update-category/${params._id}`, params);
  }

  getCategoryById(id: any): Observable<any> {
    return this.apiService.get(`jobCategories/get-category-by-id/${id}`);
  }

  getCategories(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`jobCategories/get-categories?rows=${rows}&page=${page}`, params);
  }

  deleteCategory(id: any): Observable<any> {
    return this.apiService.delete(`jobCategories/delete-category/${id}`);
  }
}
