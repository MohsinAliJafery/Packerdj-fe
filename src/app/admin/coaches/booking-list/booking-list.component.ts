import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  @ViewChild('addModal', { static: true }) addModal:
    | ElementRef
    | undefined;


  componentInView = new Subject();
  bookingList: any = [];
  coach_id: any;
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  meetingLink: any;
  authorizationUrl: any;
  bookingId: any;
  coachId: any;
  bookingData: any;
  constructor(
    private route: ActivatedRoute,
    private booking_service: BookingService,
    private toastr: ToastrService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.coach_id = params['coachid'];
      if (this.coach_id) {
        this.getBookingByCoachId(this.coach_id);
      }
    });
  }

  getBookingByCoachId(id: any): void {
    this.booking_service.getSessionsByCoachId(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          this.bookingList = response.sessions;
          this.totalReq = response.totalReq;
          this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
          this.calculatePageNumbers();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  generateLink(v: any): void {
    this.bookingData = v;
    const bookingDataString = JSON.stringify(this.bookingData);
    const encodedBookingData = encodeURIComponent(bookingDataString);

    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=NMQJFTtCQby6ou2tHhMlKA&redirect_uri=https://pekerdja.co/api/bookings/redirect&state=${encodedBookingData}`
    // const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=7JoKpiKJSHS3X6kUANOjYA&redirect_uri=https://pekerdja.co/api/bookings/redirect&state=${encodedBookingData}`
    // const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=tgTrOsDLTVSvkmHwzf3wvw&redirect_uri=http://localhost:5000/api/bookings/redirect&state=${encodedBookingData}`
    window.open(authorizationUrl, "_blank");
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
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

  openAddModal(v: any) {
    this.bookingId = v._id;
    this.coachId = v.coach_id;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      size: 'md'
    };
    this.modalService.open(this.addModal, ngbModalOptions);
  }
  dismissAll() {
    this.meetingLink = '';
    this.modalService.dismissAll();
  }

  sendMeetingLink() {

    if (this.meetingLink) {
      const params = {
        _id: this.bookingId,
        coach_id: this.coach_id,
        link: this.meetingLink
      }
      this.booking_service.generateMeetingLink(params)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response: any) => {
            this.dismissAll()
            this.toastr.success(response.message);
            this.getBookingByCoachId(this.coach_id);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    else {
      this.toastr.error('Provide valid content')

    }

  }
}
