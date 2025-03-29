import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  sidebarItems: Array<any>;
  constructor(private router: Router) {
    this.sidebarItems = [
      { label: 'Candidates', route: '/admin/dashboard/candidate' },
      { label: 'Employers', route: '/admin/dashboard/employer' },
      { label: 'Skill Assessment', route: '/admin/dashboard/skillAssessment' },
      { label: 'Jobs', route: '/admin/dashboard/jobs' },
      { label: 'Coaches', route: '/admin/dashboard/coaches' },
      { label: 'Transactions', route: '/admin/dashboard/transactions' },
      { label: 'Emails', route: '/admin/dashboard/email' },
      { label: 'Settings', route: '/admin/dashboard/settings' },
      { label: 'Job Categories', route: '/admin/dashboard/jobcategory/category-list' },
      { label: 'Coach Categories', route: '/admin/dashboard/coachcategory/category-list' },
      { label: 'Coach Types', route: '/admin/dashboard/coachtype/type-list' },
      { label: 'FAQs', route: '/admin/dashboard/faqs/list' },
      { label: 'Testimonials', route: '/admin/dashboard/testimonials/list' },
      { label: 'About Pekerdja', route: '/admin/dashboard/about/list' },


    ];
  }

  ngOnInit(): void { }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/adminlogin']).then();
  }
}
