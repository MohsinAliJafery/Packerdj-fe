import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { EmployerService } from 'src/app/services/employer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.scss']
})
export class EmployerListComponent implements OnInit {
  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;
  SearchForm!: FormGroup;
  employersList: any = [];
  componentInView = new Subject();
  http: any;
  baseURL = environment.API_URL;

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  deletedId: any;

  constructor(private router: Router, private employer_Service: EmployerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.SearchForm = this.formBuilder.group({
      title: ['']
    });
    this.getEmployers();
  }

  onCreate() {
    let id = "create";
    this.router.navigateByUrl('/admin/dashboard/employer/' + id);
  }

  getEmployers(params?: any): void {
    this.employer_Service.getEmployers(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.employersList = response.employers;
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();
      }
    }, error => {
      console.log(error);
    });
  }

  deleteEmployer(): void {
    this.employer_Service.deleteEmployer(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getEmployers();
        this.modalService.dismissAll();
        this.toastr.success(response.message)
      }
    }, error => {
      console.log(error);
    });
  }

  editEmployer(id: any) {
    const url = `/admin/dashboard/employer/edit?id=${id}`
    window.open(url, '_blank');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getEmployers();
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

  ViewJobs(emp_id: any) {
    this.router.navigate(['/admin/dashboard/employer/job-detail/'], { queryParams: { emp_id } });
  }

  onSearchclick() {
    let params = this.SearchForm.value;
    this.getEmployers(params);
  }


  exportData() {

    this.employer_Service.getAllEmployersData().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        const url = this.baseURL + response.downloadLink;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'CompaniesData.csv';
        link.click();

      }
    }, error => {
      console.log(error);
    });


  }

}
