import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-create-testimonial',
  templateUrl: './create-testimonial.component.html',
  styleUrls: ['./create-testimonial.component.scss']
})
export class CreateTestimonialComponent implements OnInit {

  componentInView = new Subject();
  testimonialForm!: FormGroup;
  userId: any;
  urls!: Array<any>;
  checked: any | string = false;
  http: any;
  baseUrl!: FormData;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private testimonial_Service: TestimonialService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.testimonialForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      title: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      multiImage: this.formBuilder.array([]),
      _id: [''],
    });

    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.getTestimonialByID(this.userId);
      }
    });
  }

  onClick() {

    if (this.testimonialForm.valid) {
      if (!this.testimonialForm.value.multiImage?.length) {
        this.toastr.error("Provide upload at least one image!", "Error !!",);
        return
      }
      const formData: FormData = new FormData();
      formData.append('fullName', this.testimonialForm.get('fullName')?.value);
      formData.append('designation', this.testimonialForm.get('designation')?.value);
      formData.append('description', this.testimonialForm.get('description')?.value);
      formData.append(
        'title',
        this.testimonialForm.get('title')?.value
      );

      const file = this.testimonialForm.get('multiImage')?.value;
      if (file != undefined) {
        formData.append('file', file[0]);
      }

      this.testimonial_Service
        .createTestimonial(formData)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.testimonialForm.reset();
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/testimonials']);
            }

          },
          (error) => {
            console.log(error);
          }
        );
    } else {

      this.toastr.error("Provide all details!", "Error !!",);
      this.testimonialForm.markAllAsTouched();
    }
  }

  getTestimonialByID(id: any): void {
    this.testimonial_Service
      .getTestimonialByID(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          this.testimonialForm.patchValue(response.testimonial);
          this.testimonialForm?.get('_id')?.setValue(response.testimonial._id);
        },

        error => {
          this.toastr.error(error.error.message);
        }
      );
  }

  updateTestimonial(): void {
    if (this.testimonialForm.valid) {
      const formData: FormData = new FormData();
      formData.append('fullName', this.testimonialForm.get('fullName')?.value);
      formData.append('designation', this.testimonialForm.get('designation')?.value);
      formData.append('description', this.testimonialForm.get('description')?.value);
      formData.append(
        'title',
        this.testimonialForm.get('title')?.value
      );

      const file = this.testimonialForm.get('multiImage')?.value;
      if (file != undefined) {
        formData.append('file', file[0]);
      }

      this.testimonial_Service
        .updateTestimonial(formData, this.testimonialForm.value._id)
        .subscribe(
          (response: any) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/testimonials']);
            }
          },
          (err: any) => {
          }
        );
    } else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.testimonialForm.markAllAsTouched();

    }
  }
  validateMultiImage(control: AbstractControl): ValidationErrors | null {
    const files = control.value;
    if (Array.isArray(files) && files.length > 0) {
      return null;
    } else {
      return { required: true };
    }
  }

  onSelect(e: any) {
    this.urls = [];
    let selectedFiles = e.target.files[0];
    this.creatImage(e.target.files[0]);
    if (selectedFiles) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);

      if (selectedFiles.length > 0) {
        this.testimonialForm.get('multiImage')?.setErrors(null);
      } else {
        this.testimonialForm.get('multiImage')?.setErrors({ required: true });
      }
    }
  }

  creatImage(img: any) {
    const newImage: any = new FormControl(img, Validators.required);
    (<FormArray>this.testimonialForm.get('multiImage')).push(newImage);
    this.checked.valueChanges.subscribe((v: any) => {
    });

    this.checked.setValue(true || false);
  }

}
