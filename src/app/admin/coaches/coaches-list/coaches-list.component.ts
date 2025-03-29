import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { COACH_BUDGET } from 'src/app/config/constant';
import { CoachCategoryService } from 'src/app/services/coachcategory.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { CoachTypeService } from 'src/app/services/coachtype.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.scss']
})
export class CoachesListComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) deleteModal:
    | ElementRef
    | undefined;

  SearchCoachForm!: FormGroup;
  componentInView = new Subject();
  coachesList: any = [];
  http: any;
  baseURL = environment.API_URL;
  CoachBudget = COACH_BUDGET

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  deletedId: any;
  CoachCategoryList: any;
  CoachTypeList: any;

  constructor(private router: Router,
    private coach_service: CoachesService,
    private category_service: CoachCategoryService,
    private type_service: CoachTypeService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.SearchCoachForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      coachType: ['', [Validators.required]],
      coachCategory: ['', [Validators.required]],
      budget: ['', [Validators.required]],
    });
    this.getCoaches();
    this.getCoachCategories()
    this.getCoachTypes()
  }

  getCoachCategories(): void {
    this.category_service.getCategories().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.CoachCategoryList = response.categories;
    },
      error => {
        console.log(error);
      }
    );
  }

  getCoachTypes(): void {
    this.type_service.getTypes().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.CoachTypeList = response.types;
    },
      error => {
        console.log(error);
      }
    );
  }

  onCreate() {
    this.router.navigateByUrl('/admin/dashboard/coaches/coaches-list/create');
  }

  onClick(coach_id: any) {
    this.router.navigate(['/admin/dashboard/coaches/detail/'], { queryParams: { coach_id } });
  }
  ViewBookings(coachid: any) {
    this.router.navigate(['/admin/dashboard/coaches/bookings/'], { queryParams: { coachid } });
  }

  getCoaches(params?: any): void {
    this.coach_service.getCoaches(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.coachesList = response.coaches;
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();
      }
    }, error => {
      console.log(error);
    });
  }


  deleteCoach(): void {
    this.coach_service.deleteCoach(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getCoaches();
        this.modalService.dismissAll();
        this.toastr.success(response.message)
      }
    }, error => {
      console.log(error);
    });
  }

  editCoach(id: any) {
    const url = `/admin/dashboard/coaches/edit?id=${id}`
    window.open(url, '_blank');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getCoaches();
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

  searchCoaches() {
    const params = this.SearchCoachForm.value;
    this.getCoaches(params);
  }

}
