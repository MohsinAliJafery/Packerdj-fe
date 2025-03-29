import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class skillAssessment {

  apiURL = environment.API_URL;
  showLoader = false;

  constructor(
    private apiService: ApiService
  ) { }

  addSkill(params: any): Observable<any> {
    return this.apiService.post(`skills/create-skill`, params);
  }

  updateSkill(params: any): Observable<any> {
    return this.apiService.put(`skills/update-skill/${params._id}`, params);
  }

  getSkillById(id: any): Observable<any> {
    return this.apiService.get(`skills/get-skill-by-id/${id}`);
  }

  getSkills(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`skills/get-skills?rows=${rows}&page=${page}`, params);
  }

  deleteSkill(id: any): Observable<any> {
    return this.apiService.delete(`skills/delete-skill/${id}`);
  }

}
