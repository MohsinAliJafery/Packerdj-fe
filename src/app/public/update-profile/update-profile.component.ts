import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Chart, registerables } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { AppliedJobsService } from 'src/app/services/appliedJobs.service';
import { BookingService } from 'src/app/services/booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm!: FormGroup;
  componentInView = new Subject();
  baseURl = environment.API_URL;

  @ViewChild('coaching', { static: true }) coaching: ElementRef | undefined;


  fullTime: any = [];
  partTime: any = [];
  internship: any = [];
  userId: any;
  jobsList: any = [];
  totalJobs: any = [];
  appliedjobsList: any;
  totalAppliedJobs: any = [];
  hideAllBtn: boolean = false;

  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  coachingSessionList: any = [];
  userName: any;
  AppliedJobsByMonth: any;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    public footerService: FooterVisibleService,
    private appliedjob_Service: AppliedJobsService,
    private booking_service: BookingService) {
    Chart.register(...registerables);
    this.footerService.isProfile = true;
    this.footerService.isRouteShow = false;
    localStorage.setItem('update-profile', 'true');
  }

  ngOnInit(): void {

    let user: any = localStorage.getItem('user');
    const parsedObject = JSON.parse(user);
    this.userId = parsedObject._id;
    this.userName = parsedObject.firstName;
    this.getAppliedjobsById(this.userId);
    this.getAppliedjobsByMonth(this.userId);
  }

  getAppliedjobsById(id: any): void {
    this.appliedjob_Service
      .getJobByUserId(id, this.startIndex, this.itemsPerPage)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.totalAppliedJobs = response.data;
            this.appliedjobsList = this.totalAppliedJobs.slice(0, 2);
            this.totalReq = response.totalReq;
            this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
            this.calculatePageNumbers();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getAppliedjobsByMonth(id: any): void {
    this.appliedjob_Service
      .getAppliedjobsByMonth(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.AppliedJobsByMonth = response.data;
            this.JobChart();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }


  onClick() {
    this.router.navigateByUrl('public/public-dashboard/my-resume');
  }
  redirectTo() {
    // this.router.navigateByUrl('public/public-dashboard/user-profile');
  }

  openModel(coaching: any) {
    this.booking_service
      .getSessionsByUserId(this.userId)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.coachingSessionList = response.sessions;

          }
        },
        (error) => {
          console.log(error);
        }
      );


    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      // size:'custom-width',
      windowClass: 'custom-backdrop custom-width-modal',
    };
    this.modalService.open(coaching, ngbModalOptions);
  }

  dismissAll() {
    this.modalService.dismissAll();
  }
  redirect() {
    this.router.navigateByUrl('public/public-dashboard/update-profile ');
  }

  JobChart() {

    const fulltime = this.AppliedJobsByMonth.filter((i: any) => i.job_type == 'Full Time');
    this.fullTime = fulltime[0].months;
    const parttime = this.AppliedJobsByMonth.filter((i: any) => i.job_type == 'Part Time');
    this.partTime = parttime[0].months;
    const internship = this.AppliedJobsByMonth.filter((i: any) => i.job_type == 'Internship');
    this.internship = internship[0].months;

    var chartData = new Chart('JobChart', {
      type: 'line',

      options: {
        scales: {
          y: {
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.4,
          },
        },
      },

      data: {
        labels: this.fullTime.map((row: any) => row.month),
        datasets: [
          {
            label: 'Full-Time',
            data: this.fullTime.map((row: any) => row.count),
            backgroundColor: '#019585',
            borderColor: '#019585',
          },
          {
            label: 'Part-Time',
            data: this.partTime.map((row: any) => row.count),
            backgroundColor: '#FFA14A',
            borderColor: '#FFA14A',
          },
          {
            label: 'Internship',
            data: this.internship.map((row: any) => row.count),
            backgroundColor: '#645BFD',
            borderColor: '#645BFD',
          },
        ],
      },
    });
  }

  redirectToJobs() {
    let container = document.getElementById('section1');
    container?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    localStorage.removeItem('update-profile');
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getAppliedjobsById(this.userId);
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

  showAll() {
    this.hideAllBtn = true;
    this.appliedjobsList = this.totalAppliedJobs;
  }

  onAppliedJobClick(id: any) {
    this.router.navigate(['/public/public-dashboard/job-detail/'], { queryParams: { id } });
  }
}
