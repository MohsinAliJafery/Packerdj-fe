import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { JobService } from 'src/app/services/job.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JOBTYPE } from 'src/app/config/constant';
import { JobCategoryService } from 'src/app/services/jobcategory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;
  baseURL = environment.API_URL;
  SearchjobForm!: FormGroup;
  componentInView = new Subject();
  jobsList: any = [];
  JobType: any = JOBTYPE;
  JobCategory: any;
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  deletedId: any;
  params = {
    newest: true
  }
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private category_service: JobCategoryService,
    private job_Service: JobService, private toastr: ToastrService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.SearchjobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobCategory: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    this.getJobs(this.params)
    this.getCategories()
  }

  onSearchclick() {
    this.params = this.SearchjobForm.value;
    this.params.newest = true;
    this.getJobs(this.params);
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

  onCreate() {
    let id = "add";
    this.router.navigateByUrl('/admin/dashboard/jobs/' + id);
  }

  getJobs(params?: any): void {
    this.job_Service.getJobs(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.jobsList = response.jobs;
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();
      }
    }, error => {
      console.log(error);
    });
  }

  deleteJob(): void {
    this.job_Service.deleteJob(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getJobs(this.params);
        this.modalService.dismissAll();
        this.toastr.success(response.message);
      }
    }, error => {
      console.log(error);
    });
  }

  editJob(id: any) {
    const url = `/admin/dashboard/jobs/edit?id=${id}`
    window.open(url, '_blank');
  }

  ViewApplicants(job_id: any) {
    this.router.navigate(['/admin/dashboard/jobs/job-applicants/'], { queryParams: { job_id } });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getJobs(this.params);
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

  openDeleteModal(id: any) {
    this.deletedId = id;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      size: 'sm'
    };
    this.modalService.open(this.deleteModal, ngbModalOptions);
  }
  dismissAll() {
    this.modalService.dismissAll();
  }

  exportData() {

    this.job_Service.getAllJobsData().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        const url = this.baseURL + response.downloadLink;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'JobsData.csv';
        link.click();

      }
    }, error => {
      console.log(error);
    });

  }


}
