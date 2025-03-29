import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  componentInView = new Subject();
  baseURL = environment.API_URL;
  jobsList: any = []
  id: any;

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;

  constructor(
    private route: ActivatedRoute,
    private job_Service: JobService

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['emp_id'];
      if (this.id) {
        this.getjobsByempID(this.id);
      }
    });
  }

  getjobsByempID(id: any): void {
    this.job_Service
      .getjobByEmpId(id, this.startIndex, this.itemsPerPage)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.jobsList = response.jobs;
            this.totalReq = response.totalReq;
            this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
            this.calculatePageNumbers();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getjobsByempID(this.id);
    }
  }

  calculatePageNumbers(): void {
    const visiblePages = 5;
    const pageRange = Math.min(visiblePages, this.totalPages);
    let startPage = Math.max(this.currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;
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


}
