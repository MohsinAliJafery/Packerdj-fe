import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newest-jobs',
  templateUrl: './newest-jobs.component.html',
  styleUrls: ['./newest-jobs.component.scss']
})
export class NewestJobsComponent implements OnInit {

  componentInView = new Subject();
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 3;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  jobsList: any = [];
  params = {
    newest: true,
    status: 'Active'

  }
  baseURL = environment.API_URL;
  constructor(
    private job_Service: JobService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getJobs(this.params);
  }

  getJobs(params?: any): void {
    this.job_Service.getJobs(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.jobsList = response.jobs;
        this.totalReq = response.totalReq;
        this.jobsList.map((i: any) => {
          i.postedDate = formatDistanceToNow(new Date(i.createdAt), { addSuffix: true });
        })
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();

      }
    }, error => {
      console.log(error);
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getJobs(this.params)
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


  onCardclick(isClicked: boolean, index: any, id: any) {
    if (isClicked === false) {
      for (let i = 0; i < this.jobsList.length; i++) {
        if (i === index) {
          this.jobsList[index].isCardclick = true;
        } else {
          this.jobsList[i].isCardclick = false;
        }

      }
    } else {
      for (let i = 0; i < this.jobsList.length; i++) {
        this.jobsList[index].isCardclick = false;
      }
    }

    this.router.navigate(['/public/public-dashboard/job-detail/'], { queryParams: { id } });
  }

}
