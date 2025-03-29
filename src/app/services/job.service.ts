import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class JobService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  addJob(params: any): Observable<any> {
    return this.apiService.post(`jobs/create-job`, params);
  }

  updateJob(params: any): Observable<any> {
    return this.apiService.put(`jobs/update-job/${params._id}`, params);
  }

  getjobById(id: any): Observable<any> {
    return this.apiService.get(`jobs/get-job-by-id/${id}`);
  }
  getjobByEmpId(id: any, page?: any, rows?: any): Observable<any> {
    return this.apiService.get(`jobs/get-job-by-emp_id/${id}?rows=${rows}&page=${page}`);
  }

  getJobs(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`jobs/get-jobs?rows=${rows}&page=${page}`, params);
  }

  getAllJobsData(): Observable<any> {
    return this.apiService.get(`jobs/get-alljobs-data`);
  }

  deleteJob(id: any): Observable<any> {
    return this.apiService.delete(`jobs/delete-job/${id}`);
  }



}
