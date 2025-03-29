import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CoachesService } from 'src/app/services/coaches.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-coach',
  templateUrl: './detail-coach.component.html',
  styleUrls: ['./detail-coach.component.scss'],
})
export class DetailCoachComponent implements OnInit {
  componentInView = new Subject();
  coachDetail: any;
  coaches: any = [];
  baseURL = environment.API_URL;

  constructor(
    private route: ActivatedRoute,
    private coaches_service: CoachesService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['coach_id'];
      if (id) {
        this.getCoachDetail(id);
      }
    });
  }


  getCoachDetail(id: any): void {
    this.coaches_service.getCoachByID(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response: any) => {
          this.coachDetail = response.coach;
          this.coaches.push(this.coachDetail);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
