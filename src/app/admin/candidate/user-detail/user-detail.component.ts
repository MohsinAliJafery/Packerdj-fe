import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppliedJobsService } from 'src/app/services/appliedJobs.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent implements OnInit {
  componentInView = new Subject();
  detailList: any = [];
  baseURL = environment.API_URL;
  pdfSrc: any | undefined;

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  appliedjobsList: any;

  constructor(private route: ActivatedRoute, private candidate_service: CandidateService, private appliedjob_Service: AppliedJobsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.getUserdetailByid(userId)
      }
    });
  }

  getUserdetailByid(userId: any) {
    this.candidate_service.getUserByid(userId).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.detailList = response.user;
        this.getAppliedjobsById(this.detailList._id)
      }
    }, error => {
      console.log(error);
    });
  }

  getAppliedjobsById(id: any): void {
    this.appliedjob_Service
      .getJobByUserId(id, this.startIndex, this.itemsPerPage)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.appliedjobsList = response.data;
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

  downloadPdf(data: any) {
    this.pdfSrc = this.baseURL + data.path;
    const link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = data.originalname;
    link.click();
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
