import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CoachCategoryService } from 'src/app/services/coachcategory.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;
  componentInView = new Subject();
  categoryList: any = [];

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  deletedId: any;

  constructor(private router: Router, private category_service: CoachCategoryService,
    private toastr: ToastrService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onCreate() {
    let id = "add";
    this.router.navigateByUrl('/admin/dashboard/coachcategory/' + id);
  }

  getCategories(): void {
    this.category_service.getCategories(this.startIndex, this.itemsPerPage).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.categoryList = response.categories;
      this.totalReq = response.totalReq;
      this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
      this.calculatePageNumbers();
    },
      error => {
        console.log(error);
      }
    );
  }

  deleteCategory(): void {
    this.category_service.deleteCategory(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getCategories();
        this.modalService.dismissAll();
        this.toastr.success(response.message);
      }
    }, error => {
      console.log(error);
    });
  }

  editCategory(id: any) {
    const url = `/admin/dashboard/coachcategory/edit?id=${id}`
    window.open(url, '_blank');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getCategories();
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
