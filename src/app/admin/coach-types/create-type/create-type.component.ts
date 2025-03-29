import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CoachTypeService } from 'src/app/services/coachtype.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.scss']
})
export class CreateTypeComponent implements OnInit {

  typeForm!: FormGroup;
  id: any | string;
  componentInView = new Subject();

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private type_service: CoachTypeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.typeForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      _id: [''],
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getTypeById(id);
      }
    });
  }

  onClick() {
    if (this.typeForm.valid) {
      this.type_service.addType(this.typeForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.typeForm.reset();
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/coachtype']);
            }

          },
          (error) => {
            console.log(error);
          }
        );

    }
    else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.typeForm.markAllAsTouched();
    }
  }

  getTypeById(id: any): void {
    this.type_service.getTypeById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.typeForm.patchValue(response.type);
      this.typeForm?.get('_id')?.setValue(response.type._id);
    },

      error => {
        this.toastr.error(error.error.message);
      }

    );
  }

  updateType(): void {
    if (this.typeForm.valid) {
      this.type_service.updateType(this.typeForm.value).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.toastr.success(response.message);
            this.router.navigate(['/admin/dashboard/coachtype']);
          }
        },
      )

    } else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.typeForm.markAllAsTouched();
    }
  }
}
