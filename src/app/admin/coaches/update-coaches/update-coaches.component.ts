import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { COACH_CATEGORY, DAYS, EXPERTISE, FLUENTIN, careerSkills, englishSkills, softSkills, technicalSkills } from 'src/app/config/constant';
import { CoachCategoryService } from 'src/app/services/coachcategory.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { CoachTypeService } from 'src/app/services/coachtype.service';

@Component({
  selector: 'app-update-coaches',
  templateUrl: './update-coaches.component.html',
  styleUrls: ['./update-coaches.component.scss'],
})
export class UpdateCoachesComponent implements OnInit {
  coachesForm!: FormGroup;
  id: any | string;
  userId: any;
  urls!: Array<any>;
  checked: any | string = false;
  http: any;
  baseUrl!: FormData;
  DaysList = DAYS
  category = COACH_CATEGORY
  technicalSkills = technicalSkills
  softSkills = softSkills
  careerSkills = careerSkills
  englishSkills = englishSkills
  coachType: any
  componentInView = new Subject();

  expertiseList = [
    { label: 'Technical', selected: false },
    { label: 'Career', selected: false },
  ];

  FluentinList = [
    { label: 'English', selected: false },
    { label: 'Indonesian', selected: false },
  ];
  currentDate: any;
  CoachCategoryList: any;
  CoachTypeList: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coach_service: CoachesService,
    private toastr: ToastrService,
    private category_service: CoachCategoryService,
    private type_service: CoachTypeService
  ) { }

  ngOnInit(): void {

    this.currentDate = new Date().toISOString().split('T')[0];

    this.coachesForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      link: ['', [Validators.required]],
      company: ['', [Validators.required]],
      expertise: this.formBuilder.array([]),
      fluentIn: this.formBuilder.array([]),
      multiImage: this.formBuilder.array([]),
      _id: [''],
      experiences: this.formBuilder.array([]),
      education: this.formBuilder.array([]),
      coaching: this.formBuilder.array([]),
      slot: this.formBuilder.array([]),
      category: ['', [Validators.required]],
      coachCategory: ['', [Validators.required]],
      coachCategoryId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      coachType: ['', [Validators.required]],
      coachTypeId: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.getCoachByID(this.userId);
      }
    });
    this.getCoachCategories();
    this.getCoachTypes();
  }

  getCoachCategories(): void {
    this.category_service.getCategories().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.CoachCategoryList = response.categories;
    },
      error => {
        console.log(error);
      }
    );
  }

  getCoachTypes(): void {
    this.type_service.getTypes().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.CoachTypeList = response.types;
    },
      error => {
        console.log(error);
      }
    );
  }


  get coaching() {
    return this.coachesForm.get('coaching') as FormArray;
  }

  get education() {
    return this.coachesForm.get('education') as FormArray;
  }

  get experiences() {
    return this.coachesForm.get('experiences') as FormArray;
  }
  get slot() {
    return this.coachesForm.get('slot') as FormArray;
  }

  // Remove experience section
  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }
  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  removeCoach(index: number) {
    this.coaching.removeAt(index);
  }
  removeSlot(index: number) {
    this.slot.removeAt(index);
  }

  // Add experience section
  addExperience() {
    const experience = this.formBuilder.group({
      title: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.experiences.push(experience);
  }
  addEducation() {
    const education = this.formBuilder.group({
      title: ['', Validators.required],
      institute: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
    });

    this.education.push(education);
  }
  addCoaching() {
    const coaching = this.formBuilder.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
      charges: ['', Validators.required],
    });

    this.coaching.push(coaching);
  }
  addSlot() {
    const slot = this.formBuilder.group({
      date: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      status: ['Active']
    });

    this.slot.push(slot);
  }

  selectExpertise() {
    const allSelected = this.expertiseList.every((item) => item.selected);
    this.expertiseList.forEach((item) => (item.selected = true));

    const expertiseArray = this.coachesForm.get('expertise') as FormArray;
    expertiseArray.clear();

    if (!allSelected) {
      const selectedItems = this.expertiseList.filter((item) => item.selected);
      selectedItems.forEach((item) => {
        expertiseArray.push(this.formBuilder.control(item.label));
      });
    }
  }

  updateExpertise(item: any, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    item.selected = checked;

    const expertiseArray = this.coachesForm.get('expertise') as FormArray;

    if (checked) {
      if (!expertiseArray.value.includes(item.label)) {
        this.coachesForm.value.expertise.push(item.label);
      }
    } else {
      const index = expertiseArray.value.indexOf(item.label);
      if (index !== -1) {
        this.coachesForm.value.expertise.splice(index, 1);
      }
    }
  }

  validations() {
    const expertiseArray = this.coachesForm.get('expertise') as FormArray;

    if (expertiseArray.value.length === 0) {
      expertiseArray.setErrors({ required: true });
    } else {
      expertiseArray.setErrors(null);
    }
  }

  selectFluent() {
    const allSelected = this.FluentinList.every((item) => item.selected);
    this.FluentinList.forEach((item) => (item.selected = true));

    const fluentInArray = this.coachesForm.get('fluentIn') as FormArray;
    fluentInArray.clear();

    if (!allSelected) {
      const selectedItems = this.FluentinList.filter((item) => item.selected);
      selectedItems.forEach((item) => {
        fluentInArray.push(this.formBuilder.control(item.label));
      });
    }
  }

  updateFluent(item: any, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    item.selected = checked;

    const fluentInArray = this.coachesForm.get('fluentIn') as FormArray;

    if (checked) {
      if (!fluentInArray.value.includes(item.label)) {
        this.coachesForm.value.fluentIn.push(item.label);
      }
    } else {
      const index = fluentInArray.value.indexOf(item.label);
      if (index !== -1) {
        this.coachesForm.value.fluentIn.splice(index, 1);
      }
    }
  }

  updateFluentValidation() {
    const fluentInArray = this.coachesForm.get('fluentIn') as FormArray;

    if (fluentInArray.value.length === 0) {
      fluentInArray.setErrors({ required: true });
    } else {
      fluentInArray.setErrors(null);
    }
  }

  getCoachByID(userId: any): void {
    this.coach_service
      .getCoachByID(userId)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          for (let i = 0; i < response.coach.coaching.length; i++) {
            const coaching = this.formBuilder.group({
              title: ['', Validators.required],
              duration: ['', Validators.required],
              charges: ['', Validators.required],
            });

            this.coaching.push(coaching);
          }
          for (let i = 0; i < response.coach.education.length; i++) {

            const education = this.formBuilder.group({
              title: ['', Validators.required],
              institute: ['', Validators.required],
              from: ['', Validators.required],
              to: ['', Validators.required],
            });

            this.education.push(education);

          }

          for (let i = 0; i < response.coach.experiences.length; i++) {
            const experience = this.formBuilder.group({
              title: ['', Validators.required],
              from: ['', Validators.required],
              to: ['', Validators.required],
              description: ['', Validators.required],
            });

            this.experiences.push(experience);
          }

          for (let i = 0; i < response.coach.slot.length; i++) {
            const slot = this.formBuilder.group({
              date: ['', Validators.required],
              from: ['', Validators.required],
              to: ['', Validators.required],
              status: ['Active']
            });

            this.slot.push(slot);
          }


          this.coachesForm.patchValue(response.coach);


          this.coachesForm?.get('_id')?.setValue(response.coach._id);

          this.FluentinList.map((j) => {
            for (let i = 0; i < response.coach.fluentIn.length; i++) {
              if (j.label == response.coach.fluentIn[i]) {
                j.selected = true;
                this.coachesForm.value.fluentIn.push(j.label);
                break
              }

            }
          });

          this.expertiseList.map((k) => {
            for (let i = 0; i < response.coach.expertise.length; i++) {
              if (k.label == response.coach.expertise[i]) {
                k.selected = true;
                this.coachesForm.value.expertise.push(k.label);
                break
              }

            }
          });

          this.coachesForm?.get('category')?.setValue(response.coach.coachCategoryId);
          this.coachesForm?.get('type')?.setValue(response.coach.coachTypeId);

        },

        error => {
          this.toastr.error(error.error.message);
        }
      );
  }



  updateCoach(): void {
    const expertiseArray = this.coachesForm.get('expertise') as FormArray;
    if (expertiseArray.value.length === 0) {
      expertiseArray.setErrors({ required: true });
    }

    const fluentInArray = this.coachesForm.get('fluentIn') as FormArray;
    if (fluentInArray.value.length === 0) {
      fluentInArray.setErrors({ required: true });
    }

    if (this.coachesForm.valid) {
      const formData: FormData = new FormData();
      formData.append('fullName', this.coachesForm.get('fullName')?.value);
      formData.append('email', this.coachesForm.get('email')?.value);
      formData.append('designation', this.coachesForm.get('designation')?.value);
      formData.append('link', this.coachesForm.get('link')?.value);
      formData.append('company', this.coachesForm.get('company')?.value);
      formData.append('coachCategory', this.coachesForm.get('coachCategory')?.value);
      formData.append('coachCategoryId', this.coachesForm.get('coachCategoryId')?.value);
      formData.append('coachType', this.coachesForm.get('coachType')?.value);
      formData.append('coachTypeId', this.coachesForm.get('coachTypeId')?.value);
      formData.append(
        'description',
        this.coachesForm.get('description')?.value
      );
      formData.append(
        'experiences',
        JSON.stringify(this.coachesForm.get('experiences')?.value)
      );
      formData.append(
        'education',
        JSON.stringify(this.coachesForm.get('education')?.value)
      );
      formData.append(
        'coaching',
        JSON.stringify(this.coachesForm.get('coaching')?.value)
      );
      formData.append(
        'fluentIn',
        JSON.stringify(this.coachesForm.get('fluentIn')?.value)
      );

      formData.append(
        'expertise',
        JSON.stringify(this.coachesForm.get('expertise')?.value)
      );

      formData.append(
        'slot',
        JSON.stringify(this.coachesForm.get('slot')?.value)
      );

      const file = this.coachesForm.get('multiImage')?.value;

      if (file != undefined) {
        formData.append('file', file[0]);
      }

      this.coach_service
        .updateCoach(formData, this.coachesForm.value._id)
        .subscribe(
          (response: any) => {
            if (response.result == 1) {
              this.toastr.success(response.message);
              this.router.navigate(['/admin/dashboard/coaches']);
            }
          },
          (err: any) => {
          }
        );
    } else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.updateFluentValidation();
      this.validations();
      this.coachesForm.markAllAsTouched();
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
        this.coachesForm.get('multiImage')?.setErrors(null);
      } else {
        this.coachesForm.get('multiImage')?.setErrors({ required: true });
      }
    }
  }

  creatImage(img: any) {
    const newImage: any = new FormControl(img, Validators.required);
    (<FormArray>this.coachesForm.get('multiImage')).push(newImage);
    this.checked.valueChanges.subscribe((v: any) => {
    });

    this.checked.setValue(true || false);
  }

  onCategoryChange(event: any) {
    this.coachesForm.patchValue({
      coachCategoryId: this.coachesForm?.get('category')?.value,
      coachCategory: event.target[event.target.selectedIndex].text
    });
  }

  onTypeChange(event: any) {

    this.coachesForm.patchValue({
      coachTypeId: this.coachesForm?.get('type')?.value,
      coachType: event.target[event.target.selectedIndex].text
    });

  }

}
