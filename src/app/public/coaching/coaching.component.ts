import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.scss']
})
export class CoachingComponent implements OnInit {

  SearchCoachForm!: FormGroup;
  isCardclick: boolean = false;
  componentInView = new Subject();
  CoachesCards: any = []
  baseURL = environment.API_URL;
  itemsPerPage: any = 4;
  startIndex: any = 0;

  Courses = [
    {
      icon: 'assets/images/courses-icon-1.png',
      title: 'Technical Skills Coaching',
      description: 'We help you to grow your technical skills',
      isCardclick: false,

    },
    {
      icon: 'assets/images/courses-icon-2.png',
      title: 'Soft Skills Coaching',
      description: 'We help you to grow your soft skills',
      isCardclick: false,

    },
    {
      icon: 'assets/images/courses-icon-3.png',
      title: 'English Skill Coaching',
      description: 'We help you to grow your english skills',
      isCardclick: false,

    },
    {
      icon: 'assets/images/courses-icon-4.png',
      title: 'Career Coaching',
      description: 'We help you to grow your career',
      isCardclick: false,

    },
  ]

  constructor(private router: Router, private formBuilder: FormBuilder, private data_Service: GlobalServiceService, private footerService: FooterVisibleService, private coach_service: CoachesService) {
  }

  ngOnInit(): void {

    this.createForm();
    this.getCoaches();
  }

  createForm() {
    this.SearchCoachForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      coachType: ['', [Validators.required]],
      coachCategory: ['', [Validators.required]],
      budget: ['', [Validators.required]],
    });
  }
  getCoaches(): void {
    this.coach_service.getCoaches(this.startIndex, this.itemsPerPage).pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.CoachesCards = response.coaches;
      }
    }, error => {
      console.log(error);
    });
  }

  CoachesDetail(id: any) {
    this.router.navigate(['/public/public-dashboard/coaching-details/'], { queryParams: { id } });
  }

  exploreCoaches() {
    this.data_Service.setCoachObject(this.SearchCoachForm.value);
    this.router.navigate(['public/public-dashboard/coaching-results'])
    this.footerService.isFirstFooterShow = true;
    this.footerService.issecondFooterShow = false;
  }

  onCardclick(isClicked: boolean, index: any) {
    if (isClicked === false) {
      for (let i = 0; i < this.Courses.length; i++) {
        if (i === index) {
          this.Courses[index].isCardclick = true;
        } else {
          this.Courses[i].isCardclick = false;
        }

      }
    } else {
      for (let i = 0; i < this.Courses.length; i++) {
        this.Courses[index].isCardclick = false;
      }
    }

  }

}
