import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AppliedJobsService } from 'src/app/services/appliedJobs.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  resumeList: Array<any> | undefined;
  componentInView = new Subject();
  jobDetail!: any;
  user: any;
  resumeSelected: File | undefined;
  selected: boolean = false;
  selectedValue: any;
  baseURL = environment.API_URL;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private job_service: JobService, private user_service: UserService, private appliedJob_service: AppliedJobsService) {
  }

  ngOnInit(): void {

    let data: any = localStorage.getItem('user');
    this.user = JSON.parse(data);
    if (this.user) {
      this.getResumeData()
    }

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getjobById(id);
      }
    });


  }

  getResumeData() {
    this.user_service.getUserResume(this.user._id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          if (response.result == 1) {
            this.resumeList = response.resumes;
          }

        },
        (error) => {
          console.log(error);

        }
      );
  }


  getjobById(id: any): void {
    this.job_service.getjobById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      if (response.result == 1) {
        this.jobDetail = response.job
      }
    }
    );
  }


  openModel(applyjob: any) {
    if (this.user) {

      let ngbModalOptions: NgbModalOptions = {
        backdrop: true,
        keyboard: false,
        centered: true,
        // size:'custom-width',
        windowClass: 'custom-backdrop custom-width-modal',
      };
      this.modalService.open(applyjob, ngbModalOptions);
    }
    else {
      localStorage.setItem('job_id', JSON.stringify(this.jobDetail._id));
      this.router.navigate(['/auth/login/']);

    }
  }

  dismissAll() {
    this.modalService.dismissAll();
  }

  ApplyJob() {
    if (this.selected) {
      const params = {
        user_id: this.user._id,
        job_id: this.jobDetail._id,
        file: this.resumeSelected

      }
      this.appliedJob_service.addData(params).pipe(takeUntil(this.componentInView)).subscribe(response => {
        if (response.result == 1) {
          this.toastr.success(response.message);
          this.dismissAll();
        }
        if (response.result == -1) {
          this.toastr.success(response.message);
          this.dismissAll();
        }
      }
      );
    }
    else {
      this.toastr.error('Select atleast one resume');
    }

  }

  selectedResume(data: any, i: any) {
    this.selectedValue = i;
    this.resumeSelected = data;
    this.selected = true;
  }
}
