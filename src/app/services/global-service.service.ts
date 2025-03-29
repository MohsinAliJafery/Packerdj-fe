import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  private jobObject: any;
  private CoachObject: any;
  cur_URL = environment.CUR_URL;

  constructor(private httpClient: HttpClient) { }


  setJobObject(data: any) {
    this.jobObject = data;
  }

  getJobObject() {
    return this.jobObject;
  }

  setCoachObject(data: any) {
    this.CoachObject = data;
  }

  getCoachObject() {
    return this.CoachObject;
  }

  getExchangeRate(amount: any): Observable<any> {
    return this.httpClient.get(`${this.cur_URL}/${amount}`);
  }

}
