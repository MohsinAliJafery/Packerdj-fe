import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  SearchForm!: FormGroup;
  componentInView = new Subject();
  usersList: any = [];
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;

  constructor(private booking_service: BookingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.SearchForm = this.formBuilder.group({
      title: [''],
      email: ['']
    });
    this.getTransactions()
  }

  getTransactions(params?: any): void {
    this.booking_service.getTransactions(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.usersList = response.transactions;
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();
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
      this.getTransactions();
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
    this.getTransactions(params);
  }

}
