import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-applicants-detail',
  templateUrl: './applicants-detail.component.html',
  styleUrls: ['./applicants-detail.component.scss'],
})
export class ApplicantsDetailComponent implements OnInit {
  componentInView = new Subject();
  userDetail: any = [];

  constructor(
    private route: ActivatedRoute,
    private candidate_service: CandidateService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['applicants_id'];
      if (id) {
        this.getUserDetail(id);
      }
    });
  }

  getUserDetail(id: any): void {
    this.candidate_service
      .getUserByid(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.userDetail = response.data;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
