import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { JobCategoryService } from 'src/app/services/jobcategory.service';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss']
})
export class UpdateCategoriesComponent implements OnInit {

  categoryForm!: FormGroup;
  id: any | string;
  componentInView = new Subject();

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private category_service: JobCategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      _id: [''],
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getCategoryById(id);
      }
    });
  }

  onClick() {
    if (this.categoryForm.valid) {
      this.category_service.addCategory(this.categoryForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.categoryForm.reset();
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/jobcategory']);
            }

          },
          (error) => {
            console.log(error);
          }
        );

    }
    else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.categoryForm.markAllAsTouched();
    }
  }

  getCategoryById(id: any): void {
    this.category_service.getCategoryById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.categoryForm.patchValue(response.category);
      this.categoryForm?.get('_id')?.setValue(response.category._id);
    },

      error => {
        this.toastr.error(error.error.message);
      }

    );
  }

  updateCategory(): void {
    if (this.categoryForm.valid) {
      this.category_service.updateCategory(this.categoryForm.value).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.toastr.success(response.message);
            this.router.navigate(['/admin/dashboard/jobcategory']);
          }
        },
      )

    } else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.categoryForm.markAllAsTouched();
    }
  }
}
