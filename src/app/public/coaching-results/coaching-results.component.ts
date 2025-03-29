import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { COACH_BUDGET } from 'src/app/config/constant';
import { CoachCategoryService } from 'src/app/services/coachcategory.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { CoachTypeService } from 'src/app/services/coachtype.service';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-coaching-results',
  templateUrl: './coaching-results.component.html',
  styleUrls: ['./coaching-results.component.scss']
})
export class CoachingResultsComponent implements OnInit, OnDestroy {
  componentInView = new Subject();
  CoachesCards: any = []
  baseURL = environment.API_URL;
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  startIndex: any = 0;
  endIndex: any;
  totalReq: any;
  coachObject: any;
  SearchCoachForm!: FormGroup;
  params: any;
  CoachBudget = COACH_BUDGET
  // technicalSkills = technicalSkills
  // softSkills = softSkills
  // careerSkills = careerSkills
  // englishSkills = englishSkills
  // coachType: any
  CoachCategoryList: any;
  CoachTypeList: any;

  constructor(private coach_service: CoachesService,
    private category_service: CoachCategoryService,
    private type_service: CoachTypeService,
    private router: Router, private formBuilder: FormBuilder,
    private data_Service: GlobalServiceService) {
    localStorage.setItem('coaching-result', 'true')
  }

  ngOnInit(): void {
    this.coachObject = this.data_Service.getCoachObject();
    this.createForm();
    this.getCoaches(this.params);
    this.getCoachCategories()
    this.getCoachTypes()
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

  // onCategoryChange() {
  //   if (this.SearchCoachForm.value.coachCategory == 'Technical') {
  //     this.coachType = this.technicalSkills;
  //     this.SearchCoachForm?.get('coachType')?.setValue('');
  //   }
  //   if (this.SearchCoachForm.value.coachCategory == 'Soft') {
  //     this.coachType = this.softSkills;
  //     this.SearchCoachForm?.get('coachType')?.setValue('');
  //   }
  //   if (this.SearchCoachForm.value.coachCategory == 'English') {
  //     this.coachType = this.englishSkills;
  //     this.SearchCoachForm?.get('coachType')?.setValue('');
  //   }
  //   if (this.SearchCoachForm.value.coachCategory == 'Career') {
  //     this.coachType = this.careerSkills;
  //     this.SearchCoachForm?.get('coachType')?.setValue('');
  //   }
  // }
  createForm() {
    this.SearchCoachForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      coachType: ['', [Validators.required]],
      coachCategory: ['', [Validators.required]],
      budget: ['', [Validators.required]],
    });

    // this.SearchCoachForm.patchValue(this.coachObject);
    // this.params = { ...this.coachObject };

  }

  gotoCoachesDetail(id: any) {
    this.router.navigate(['/public/public-dashboard/coaching-details/'], { queryParams: { id } });
  }

  getCoaches(params?: any): void {
    this.coach_service.getCoaches(this.startIndex, this.itemsPerPage, params).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.CoachesCards = response.coaches;
        this.totalReq = response.totalReq;
        this.totalPages = Math.ceil(this.totalReq / this.itemsPerPage);
        this.calculatePageNumbers();

      }
    }, error => {
      console.log(error);
    });
  }

  searchCoaches() {
    this.params = this.SearchCoachForm.value;
    this.getCoaches(this.params);
  }

  ngOnDestroy() {
    localStorage.removeItem('coaching-result')
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getCoaches();
    }
  }

  calculatePageNumbers(): void {
    const visiblePages = 5;
    const pageRange = Math.min(visiblePages, this.totalPages);
    let startPage = Math.max(this.currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - pageRange + 1, 1);
    }
    this.pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    if (startPage > 2) {
      this.pageNumbers.unshift(-1);
    }

    if (endPage < this.totalPages - 1) {
      this.pageNumbers.push(-1);
    }
  }

}
