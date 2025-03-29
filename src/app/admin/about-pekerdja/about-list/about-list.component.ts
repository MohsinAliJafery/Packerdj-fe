import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrls: ['./about-list.component.scss']
})
export class AboutListComponent implements OnInit {

  aboutList: any = []
  componentInView = new Subject();
  constructor(private about_service: AboutPekerdjaService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.about_service.getData().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.aboutList = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  editData(id: any) {
    const url = `/admin/dashboard/about/edit?id=${id}`
    window.open(url, '_blank');
  }

}
