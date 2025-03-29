import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { JOBCATEGORY, JOBSTATUS, JOBTYPE } from 'src/app/config/constant';
import { EmployerService } from 'src/app/services/employer.service';
import { JobService } from 'src/app/services/job.service';
import { JobCategoryService } from 'src/app/services/jobcategory.service';


@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.scss'],
})
export class CreateJobsComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Description',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };

  componentInView = new Subject();
  jobForm!: FormGroup;
  id: any | string;
  job_id: any | string;
  options!: Array<any>;
  Jobs: any = JOBTYPE;
  // JobCategory: any = JOBCATEGORY;
  JobStatus: any = JOBSTATUS;
  empList: any = [];
  JobCategory: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private job_Service: JobService,
    private emp_Service: EmployerService,
    private category_service: JobCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      companyId: [''],
      salaryFrom: ['', [Validators.required]],
      salaryTo: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
      job: ['', [Validators.required]],
      jobCategory: ['', [Validators.required]],
      jobCategoryId: ['', [Validators.required]],
      _id: [''],
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe((params) => {
      this.job_id = params['id'];

      if (this.job_id) {
        this.getJobsById(this.job_id);
      }
    });

    this.getEmployers();
    this.getCategories();
  }

  getEmployers(): void {
    this.emp_Service
      .getEmployers()
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.empList = response.employers;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getCategories(): void {
    this.category_service.getCategories().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.JobCategory = response.categories;

    },
      error => {
        console.log(error);
      }
    );
  }


  onClick() {
    if (this.jobForm.valid) {
      this.job_Service
        .addJob(this.jobForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.jobForm.reset();
              this.router.navigate(['/admin/dashboard/jobs']);
            }
          },
          (error) => {
            console.log(error);
          }
        );

    }
    else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.jobForm.markAllAsTouched();
    }
  }

  ChangeCompany(event: any) {

    this.jobForm.patchValue({
      companyId: this.jobForm?.get('company')?.value,
      companyName: event.target[event.target.selectedIndex].text
    });

  }

  ChangeCategory(event: any) {

    this.jobForm.patchValue({
      jobCategoryId: this.jobForm?.get('job')?.value,
      jobCategory: event.target[event.target.selectedIndex].text
    });

  }

  getJobsById(id: any): void {
    this.job_Service
      .getjobById(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          this.jobForm.patchValue(response.job);
          this.jobForm?.get('_id')?.setValue(response.job._id);
          this.jobForm?.get('company')?.setValue(response.job.companyId);
          this.jobForm?.get('job')?.setValue(response.job.jobCategoryId);
        }
      );
  }



  updatejobs(): void {

    if (this.jobForm.valid) {

      this.job_Service.updateJob(this.jobForm.value).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.toastr.success(response.message);
            this.router.navigate(['/admin/dashboard/jobs']);
          }

        },
        (err: any) => {
          this.toastr.error(err.statusText, "Opps! :");
        }
      );
    }
    else {
      this.jobForm.markAllAsTouched();
    }
  }

}
