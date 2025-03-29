import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { JobService } from 'src/app/services/job.service';
import { formatDistanceToNow } from 'date-fns';
import { environment } from 'src/environments/environment';
import { JOBCATEGORY, JOBTYPE } from 'src/app/config/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { JobCategoryService } from 'src/app/services/jobcategory.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  SearchjobForm!: FormGroup;
  componentInView = new Subject();
  jobsList: any = [];
  baseURL = environment.API_URL;
  JobType: any = JOBTYPE;
  JobCategory: any;
  pageNumbers: any;
  totalPages: any = 0;
  paginatedJobs: any[] = [];
  currentPage: any = 1;
  itemsPerPage: any = 5;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  jobObject: any;
  searchParams: any = {
    status: 'Active',
    newest: true
  };
  constructor(public footerService: FooterVisibleService,
    private category_service: JobCategoryService,
    private data_Service: GlobalServiceService, private route: ActivatedRoute, private router: Router, private job_Service: JobService, private formBuilder: FormBuilder,) {
    this.footerService.isProfile = true;
    this.footerService.isRouteShow = false;
    localStorage.setItem('search-result', 'true')
  }

  ngOnInit(): void {
    this.jobObject = this.data_Service.getJobObject();

    this.SearchjobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobCategory: ['', [Validators.required]],
    });

    // this.SearchjobForm.patchValue(this.jobObject);
    // let params = { ...this.jobObject };
    // params.status = 'Active';
    this.getJobs();
    this.getCategories();
  }

  getJobs(): void {
    this.job_Service.getJobs(this.startIndex, this.itemsPerPage, this.searchParams).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.jobsList = response.jobs;
        this.paginatedJobs = response.jobs;
        this.totalReq = response.totalReq;
        this.paginatedJobs.map((i: any) => {
          i.postedDate = formatDistanceToNow(new Date(i.createdAt), { addSuffix: true });
        })
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();

      }
    }, error => {
      console.log(error);
    });
  }

  searchJobs() {
    this.searchParams = this.SearchjobForm.value;
    this.searchParams.status = 'Active';
    this.searchParams.newest = true;
    this.getJobs();
  }
  ngOnDestroy() {
    localStorage.removeItem('search-result')
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getJobs();
    }
  }

  calculatePageNumbers(): void {
    const visiblePages = 5;
    const pageRange = Math.min(visiblePages, this.totalPages);

    let startPage = Math.max(this.currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;

    // Adjust start and end pages if they exceed the total page range
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - pageRange + 1, 1);
    }

    this.pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    if (startPage > 2) {
      this.pageNumbers.unshift(-1);
    }

    if (endPage < this.totalPages - 1) {
      this.pageNumbers.push(-1);
    }

  }


  onCardclick(id: any) {
    this.router.navigate(['/public/public-dashboard/job-detail/'], { queryParams: { id } });

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

}
