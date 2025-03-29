import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { FaqsService } from 'src/app/services/faqs.service';
import { GlobalServiceService } from 'src/app/services/global-service.service';

@Component({
  selector: 'app-create-faqs',
  templateUrl: './create-faqs.component.html',
  styleUrls: ['./create-faqs.component.scss']
})
export class CreateFaqsComponent implements OnInit {
  faqsForm!: FormGroup;
  faq_id!: any;
  componentInView = new Subject();
  faqList: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private faq_Service: FaqsService
  ) { }

  ngOnInit(): void {
    this.getFaqs()
    this.faqsForm = this.formBuilder.group({
      _id: [''],
      faqs: this.formBuilder.array([]),
    });

    this.route.queryParams.subscribe((params) => {
      this.faq_id = params['id'];
    });
  }

  get faqs() {
    return this.faqsForm.get('faqs') as FormArray;
  }

  removeFaq(index: number) {
    this.faqs.removeAt(index);
  }
  addFaq() {
    const faq = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.faqs.push(faq);
  }


  onClick() {
    if (!this.faqsForm.value.faqs?.length) {
      this.toastr.error('Add atleast one Faq', "Error")
      return
    }
    if (this.faqsForm.valid) {
      this.faq_Service
        .addFaqs(this.faqsForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/faqs/list']);
            }

          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.faqsForm.markAllAsTouched();
    }

  }


  getFaqs(): void {
    this.faq_Service.getFaqs().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.faqList = response.faqs;
        this.faqsForm?.get('_id')?.setValue(response.faqs._id);
        for (let i = 0; i < response.faqs.faqs?.length; i++) {
          const faq = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
          });

          this.faqs.push(faq);
        }
        this.faqsForm.patchValue(response.faqs);
      }
    }, error => {
      console.log(error);
    });
  }


  updateFaqs() {
    if (!this.faqsForm.value.faqs?.length) {
      this.toastr.error('Add atleast one Faq', "Error")
      return
    }
    if (this.faqsForm.valid) {
      this.faq_Service
        .updateFaqs(this.faqsForm.value)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/faqs/list']);
            }

          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.faqsForm.markAllAsTouched();
    }

  }


}
