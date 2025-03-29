import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Chart, registerables } from 'chart.js';
import { FooterVisibleService } from 'src/app/footer-visible.service';

@Component({
  selector: 'app-user-profile-employer',
  templateUrl: './user-profile-employer.component.html',
  styleUrls: ['./user-profile-employer.component.scss'],
})
export class UserProfileEmployerComponent implements OnInit {
  applications!: Array<any>;
  postedJob!: Array<any>;

  @ViewChild('coaching', { static: true }) coaching: ElementRef | undefined;
  @ViewChild('updateProfile', { static: true }) updateProfile: | ElementRef | undefined;

  fullTime: any = [];
  partTime: any = [];
  internship: any = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public footerService: FooterVisibleService
  ) {
    Chart.register(...registerables);
    this.footerService.isProfile = true;
    this.footerService.isRouteShow = false;
    localStorage.setItem('update-profile', 'true');

    this.applications = [
      {
        title: 'UI/UX Designer',
        icon: 'assets/images/image 33-employer.png',
        type: 'Applied as UI/UX Designer',
        Date: 'Send at 18 April 2023, 12:10 PM',
        logo: 'assets/images/job-calendar.png',
        status: 'Need review',
        status2: '',
      },
      {
        title: 'Senior Data Analyst',
        icon: 'assets/images/image 12 employer.png',
        type: 'Applied as UI/UX Designer',
        Date: 'Send at 18 April 2023, 12:10 PM',
        logo: 'assets/images/job-calendar.png',
        status: 'Reviewed',
        status2: 'Closed',
      },
    ];

    this.postedJob = [
      {
        title: 'DeFi Frontend Developer',
        icon: 'assets/images/1.png',
        type: 'Woo Network',
        btn1: 'Part-time',
        btn2: 'Developer Job',
        Description1:
          'Within this role, you will be creating content for a wide range of local and international clients',
        Description2: 'Collaborate with the product marketing team',
        currency: 'Rp. 28,800,000 - 45,600,000 / month',
        month: 'Posted 5 mins ago',
      },


    ];
  }

  ngOnInit(): void {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      windowClass: 'custom-backdrop custom-width-modal',
    };
    this.modalService.open(this.updateProfile, ngbModalOptions);

    this.JobChart();
  }



  dismissAll() {
    this.modalService.dismissAll();
  }
  redirect() {
    this.router.navigateByUrl('public/public-dashboard/update-profile ');
  }

  JobChart() {
    this.fullTime = [
      { month: 'Jan', count: 16 },
      { month: 'Feb', count: 26 },
      { month: 'Mar', count: 22 },
      { month: 'Apr', count: 16 },
      { month: 'May', count: 19 },
      { month: 'Jun', count: 22 },
      { month: 'Jul', count: 12 },
      { month: 'Aug', count: 20 },
      { month: 'Sep', count: 18 },
      { month: 'Oct', count: 22 },
      { month: 'Nov', count: 19 },
      { month: 'Dec', count: 25 },
    ];
    this.partTime = [
      { month: 'Jan', count: 6 },
      { month: 'Feb', count: 16 },
      { month: 'Mar', count: 18 },
      { month: 'Apr', count: 22 },
      { month: 'May', count: 19 },
      { month: 'Jun', count: 21 },
      { month: 'Jul', count: 14 },
      { month: 'Aug', count: 20 },
      { month: 'Sep', count: 15 },
      { month: 'Oct', count: 24 },
      { month: 'Nov', count: 19 },
      { month: 'Dec', count: 22 },
    ];
    this.internship = [
      { month: 'Jan', count: 26 },
      { month: 'Feb', count: 19 },
      { month: 'Mar', count: 12 },
      { month: 'Apr', count: 20 },
      { month: 'May', count: 17 },
      { month: 'Jun', count: 24 },
      { month: 'Jul', count: 16 },
      { month: 'Aug', count: 20 },
      { month: 'Sep', count: 13 },
      { month: 'Oct', count: 21 },
      { month: 'Nov', count: 15 },
      { month: 'Dec', count: 25 },
    ];

    var chartData = new Chart('JobChart2', {
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

  ngOnDestroy() {
    localStorage.removeItem('update-profile');
  }

  redirectToJobs() {
    let container = document.getElementById('section-1');
    container?.scrollIntoView({ behavior: 'smooth' });
  }
  redirectToresume() {
    let container = document.getElementById('section-2');
    container?.scrollIntoView({ behavior: 'smooth' });
  }
  onClick() {
    this.router.navigateByUrl('public/public-dashboard/pricing-page');
  }
}
