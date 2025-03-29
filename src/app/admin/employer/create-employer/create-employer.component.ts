import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-create-employer',
  templateUrl: './create-employer.component.html',
  styleUrls: ['./create-employer.component.scss'],
})
export class CreateEmployerComponent implements OnInit {

  componentInView = new Subject();
  employerForm!: FormGroup;
  id: any | string;
  userId: any;
  urls!: Array<any>;
  checked: any | string = false;
  http: any;
  baseUrl!: FormData;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employer_Service: EmployerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.employerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      multiImage: this.formBuilder.array([]),
      _id: [''],
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.getEmployerByID(this.userId);
      }
    });
  }

  onClick() {

    if (this.employerForm.valid) {
      if (!this.employerForm.value.multiImage?.length) {
        this.toastr.error("Provide upload at least one image!", "Error !!",);
        return
      }
      const formData: FormData = new FormData();
      formData.append('fullName', this.employerForm.get('fullName')?.value);
      formData.append('address', this.employerForm.get('address')?.value);
      formData.append(
        'description',
        this.employerForm.get('description')?.value
      );

      const file = this.employerForm.get('multiImage')?.value;
      if (file != undefined) {
        formData.append('file', file[0]);
      }

      this.employer_Service
        .createEmployer(formData)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.employerForm.reset();
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/employer']);
            }

          },
          (error) => {
            console.log(error);
          }
        );
    } else {

      this.toastr.error("Provide all details!", "Error !!",);
      this.employerForm.markAllAsTouched();
    }
  }

  getEmployerByID(id: any): void {
    this.employer_Service
      .getEmployerByID(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          this.employerForm.patchValue(response.employee);
          this.employerForm?.get('_id')?.setValue(response.employee._id);
        },

        error => {
          this.toastr.error(error.error.message);
        }
      );
  }

  updateEmployer(): void {
    if (this.employerForm.valid) {
      const formData: FormData = new FormData();
      formData.append('fullName', this.employerForm.get('fullName')?.value);
      formData.append('address', this.employerForm.get('address')?.value);
      formData.append(
        'description',
        this.employerForm.get('description')?.value
      );

      const file = this.employerForm.get('multiImage')?.value;
      if (file != undefined) {
        formData.append('file', file[0]);
      }

      this.employer_Service
        .updateEmployer(formData, this.employerForm.value._id)
        .subscribe(
          (response: any) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/employer']);
            }
          },
          (err: any) => {
            // this.toastService.error(err.statusText, "Opps! :");
          }
        );
    } else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.employerForm.markAllAsTouched();

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
        this.employerForm.get('multiImage')?.setErrors(null);
      } else {
        this.employerForm.get('multiImage')?.setErrors({ required: true });
      }
    }
  }

  creatImage(img: any) {
    const newImage: any = new FormControl(img, Validators.required);
    (<FormArray>this.employerForm.get('multiImage')).push(newImage);
    this.checked.valueChanges.subscribe((v: any) => {
    });

    this.checked.setValue(true || false);
  }
}
