import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { JOBCATEGORY, JOBTYPE } from 'src/app/config/constant';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { JobService } from 'src/app/services/job.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { JobCategoryService } from 'src/app/services/jobcategory.service';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  SearchjobForm!: FormGroup;
  baseURL = environment.API_URL;
  componentInView = new Subject();
  testimonialsList: Array<any> = [];
  isCardclick: boolean = false;
  JobType: any = JOBTYPE;
  JobCategory: any;
  startIndex: any = 0;
  itemsPerPage: any = 2;
  showSlider = false;
  totalReq: any;

  constructor(private router: Router,
    private category_service: JobCategoryService,
    private formBuilder: FormBuilder, private footerService: FooterVisibleService,
    private data_Service: GlobalServiceService,
    private testimonial_Service: TestimonialService
  ) {

    this.footerService.isFirstFooterShow = false;
    this.footerService.issecondFooterShow = true;
  }

  ngOnInit(): void {

    this.SearchjobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobCategory: ['', [Validators.required]],
    });

    let job_id: any = localStorage.getItem('job_id');
    let id = JSON.parse(job_id);
    if (id) {
      this.router.navigate(['/public/public-dashboard/job-detail/'], { queryParams: { id } });
    }
    this.getCategories()
    this.getTestimonials()
  }


  onSearchclick() {
    this.data_Service.setJobObject(this.SearchjobForm.value);
    this.router.navigateByUrl('/public/public-dashboard/search-results')
    this.footerService.isFirstFooterShow = true;
    this.footerService.issecondFooterShow = false;
  }
  getCategories(): void {
    this.category_service.getCategories().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.JobCategory = response.categories;
    },
      error => {
        console.log(error);
      }
    );
  }

  getTestimonials(): void {
    this.testimonial_Service.getTestimonials(this.startIndex, this.itemsPerPage).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.testimonialsList = response.testimonials;
        this.totalReq = response.totalReq;
        this.showSlider = this.totalReq > 2 ? true : false;

      }
    }, error => {
      console.log(error);
    });
  }
  sliderClick() {
    this.startIndex = this.startIndex + this.itemsPerPage;
    if (this.startIndex > this.totalReq) {
      this.startIndex = 0;
    }
    this.getTestimonials()
  }

}
