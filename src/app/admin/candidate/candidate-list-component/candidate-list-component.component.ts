import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidate-list-component',
  templateUrl: './candidate-list-component.component.html',
  styleUrls: ['./candidate-list-component.component.scss'],
})
export class CandidateListComponentComponent implements OnInit {
  SearchForm!: FormGroup;
  componentInView = new Subject();
  usersList: any = [];
  baseURL = environment.API_URL;

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  userCount: number = 0;

  constructor(private user_service: CandidateService, private router: Router, private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.SearchForm = this.formBuilder.group({
      title: [''],
      email: ['']
    });
    this.getUsers();
  }

  getUsers(params?: any): void {
    this.user_service.getUser(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.usersList = response.users;
        this.userCount = response.userCount
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();
      }
    }, error => {
      console.log(error);
    });
  }

  userDetail(id: any) {
    this.router.navigate(['/admin/dashboard/candidate/detail/'], { queryParams: { id } });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getUsers();
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
  onSearchclick() {
    let params = this.SearchForm.value;
    this.getUsers(params);
  }

  exportData() {

    this.user_service.getAllUsersData().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        const url = this.baseURL + response.downloadLink;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'UsersData.csv';
        link.click();
      }
    })

  }
}
















