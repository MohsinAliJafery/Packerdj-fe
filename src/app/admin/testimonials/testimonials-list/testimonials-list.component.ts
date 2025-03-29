import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonials-list',
  templateUrl: './testimonials-list.component.html',
  styleUrls: ['./testimonials-list.component.scss']
})
export class TestimonialsListComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;
  testimonialsList: any = [];
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

  constructor(private router: Router, private testimonial_Service: TestimonialService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTestimonials();
  }

  onCreate() {
    let id = "create";
    this.router.navigateByUrl('/admin/dashboard/testimonials/' + id);
  }

  getTestimonials(): void {
    this.testimonial_Service.getTestimonials(this.startIndex, this.itemsPerPage).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.testimonialsList = response.testimonials;
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();
      }
    }, error => {
      console.log(error);
    });
  }

  deleteTestimonial(): void {
    this.testimonial_Service.deleteTestimonial(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getTestimonials();
        this.modalService.dismissAll();
        this.toastr.success(response.message)
      }
    }, error => {
      console.log(error);
    });
  }

  editTestimonial(id: any) {
    const url = `/admin/dashboard/testimonials/edit?id=${id}`
    window.open(url, '_blank');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getTestimonials();
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



}
