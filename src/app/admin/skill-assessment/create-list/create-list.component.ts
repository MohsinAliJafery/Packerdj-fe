import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { skillAssessment } from 'src/app/services/skillAssessment.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SKILLTYPE } from 'src/app/config/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;

  SearchForm!: FormGroup;
  componentInView = new Subject();
  skillsList: any = [];
  SkillType = SKILLTYPE


  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  deletedId: any;

  constructor(private router: Router, private skill_Service: skillAssessment,
    private formBuilder: FormBuilder,
    private toastr: ToastrService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.SearchForm = this.formBuilder.group({
      title: [''],
      searchValue: ['']
    });

    this.getSkills();
  }



  onCreate() {
    let id = "add";
    this.router.navigateByUrl('/admin/dashboard/skillAssessment/' + id);
  }

  getSkills(params?: any): void {
    this.skill_Service.getSkills(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.skillsList = response.skills;
      this.totalReq = response.totalReq;
      this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
      this.calculatePageNumbers();
    },
      error => {
        console.log(error);
      }
    );
  }

  deleteSkill(): void {
    this.skill_Service.deleteSkill(this.deletedId).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.getSkills();
        this.modalService.dismissAll();
        this.toastr.success(response.message);
      }
    }, error => {
      console.log(error);
    });
  }

  editSkill(id: any) {
    const url = `/admin/dashboard/skillAssessment/edit?id=${id}`
    window.open(url, '_blank');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getSkills();
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

  onSearchclick() {
    let params = this.SearchForm.value;
    this.getSkills(params);
  }

}
