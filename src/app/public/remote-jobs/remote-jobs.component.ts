import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { JOBTYPE } from 'src/app/config/constant';
import { FaqsService } from 'src/app/services/faqs.service';
import { JobCategoryService } from 'src/app/services/jobcategory.service';

@Component({
  selector: 'app-remote-jobs',
  templateUrl: './remote-jobs.component.html',
  styleUrls: ['./remote-jobs.component.scss']
})
export class RemoteJobsComponent implements OnInit {

  panelOpenState = false;
  expansionPanel: any;
  JobCategory: any;
  JobType: any = JOBTYPE;

  constructor(private router: Router,
    private category_service: JobCategoryService,
    private faq_Service: FaqsService
  ) {

  }

  ngOnInit(): void {
    this.getCategories()
    this.getFaqs()

  }

  redirectTO() {
    this.router.navigate(['public/public-dashboard/search-results'])
  }

  getCategories(): void {
    this.category_service.getCategories().subscribe((response: any) => {
      this.JobCategory = response.categories;
    },
      error => {
        console.log(error);
      }
    );
  }
  getFaqs(): void {
    this.faq_Service.getFaqs().subscribe((response: any) => {
      if (response.result == 1) {
        this.expansionPanel = response.faqs;
      }
    }, error => {
      console.log(error);
    });
  }
}
