import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  apiUrl = environment.API_URL
  showLoader = false;

  constructor(private apiService: ApiService) { }

  createTestimonial(params: any): Observable<any> {
    return this.apiService.post(`testimonials/create-testimonial`, params);
  }

  updateTestimonial(params: any, id: any): Observable<any> {
    return this.apiService.put(`testimonials/update-testimonial/${id}`, params);
  }

  getTestimonialByID(id: any): Observable<any> {
    return this.apiService.get(`testimonials/get-testimonial-by-id/${id}`);
  }

  getTestimonials(page?: any, rows?: any, params = null): Observable<any> {
    return this.apiService.get(`testimonials/get-testimonials?rows=${rows}&page=${page}`, params);
  }

  deleteTestimonial(id: any): Observable<any> {
    return this.apiService.delete(`testimonials/delete-testimonial/${id}`);
  }
}
