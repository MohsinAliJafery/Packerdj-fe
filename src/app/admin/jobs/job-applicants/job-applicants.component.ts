import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppliedJobsService } from 'src/app/services/appliedJobs.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss'],
})
export class JobApplicantsComponent implements OnInit {
  componentInView = new Subject();
  appliedjobsList: any = [];
  baseURL = environment.API_URL;
  pdfSrc: any | undefined;
  download: any;
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  id: any;
  SelectCheckbox: any;

  constructor(
    private appliedjob_Service: AppliedJobsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['job_id'];
      if (this.id) {
        this.getAppliedjobs(this.id);
      }
    });
  }

  getAppliedjobs(id: any): void {
    this.appliedjob_Service
      .getJobByID(id, this.startIndex, this.itemsPerPage)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.appliedjobsList = response.data;
            this.appliedjobsList.map((i: any) => {
              i.IsSelected = i.job_status == 'NOT IN ACCORDANCE';
            })
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

  downloadResume(data: any, id: any) {
    const params = {
      status: 'REVIEWED'
    };
    this.appliedjob_Service.updateJobStatus(id, params).subscribe(response => {
      if (response.result == 1) {
        this.pdfSrc = this.baseURL + data.path;
        const link = document.createElement('a');
        link.href = this.pdfSrc;
        link.download = data.originalname;
        link.click();
      }
    }, error => {
      console.log(error);
    });


  }

  checkSelected(id: any) {
    const params = {
      status: 'NOT IN ACCORDANCE'
    };
    this.appliedjob_Service.updateJobStatus(id, params).subscribe(response => {
      if (response.result == 1) {
        this.toastr.success(response.message);
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
      this.getAppliedjobs(this.id);
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

  userDetail(id: any) {
    this.router.navigate(['/admin/dashboard/candidate/detail/'], { queryParams: { id } });
  }

}
