import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CoachTypeService } from 'src/app/services/coachtype.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;
  componentInView = new Subject();
  typeList: any = [];

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  deletedId: any;

  constructor(private router: Router, private type_service: CoachTypeService,
    private toastr: ToastrService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getTypes();
  }

  onCreate() {
    let id = "add";
    this.router.navigateByUrl('/admin/dashboard/coachtype/' + id);
  }

  getTypes(): void {
    this.type_service.getTypes(this.startIndex, this.itemsPerPage).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.typeList = response.types;
      this.totalReq = response.totalReq;
      this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
      this.calculatePageNumbers();
    },
      error => {
        console.log(error);
      }
    );
  }

  deleteType(): void {
    this.type_service.deleteType(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getTypes();
        this.modalService.dismissAll();
        this.toastr.success(response.message);
      }
    }, error => {
      console.log(error);
    });
  }

  editType(id: any) {
    const url = `/admin/dashboard/coachtype/edit?id=${id}`
    window.open(url, '_blank');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getTypes();
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
