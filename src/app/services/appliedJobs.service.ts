import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class AppliedJobsService {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) { }

  addData(params: any): Observable<any> {
    return this.apiService.post(`appliedJobs/add-data`, params);
  }

  getJobByID(id: any, page?: any, rows?: any,): Observable<any> {
    return this.apiService.get(`appliedJobs/get-job-details/${id}?rows=${rows}&page=${page}`);
  }
  getJobByUserId(id: any, page?: any, rows?: any,): Observable<any> {
    return this.apiService.get(`appliedJobs/get-job-by-userId/${id}?rows=${rows}&page=${page}`);
  }
  getAppliedjobsByMonth(id: any): Observable<any> {
    return this.apiService.get(`appliedJobs/get-job-by-month/${id}`);
  }
  updateJobStatus(id: any, params: any): Observable<any> {
    return this.apiService.put(`appliedJobs/update-job-status/${id}`, params);
  }

}
