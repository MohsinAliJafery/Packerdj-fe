import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-footer-dash',
  templateUrl: './footer-dash.component.html',
  styleUrls: ['./footer-dash.component.scss'],
})
export class FooterDashComponent implements OnInit {
  aboutList: any;
  Linkedin_Link: any;
  Facebook_Link: any;
  Instagram_Link: any;

  constructor(private router: Router, public footerService: FooterVisibleService,
    private about_service: AboutPekerdjaService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.about_service.getData().pipe().subscribe((response: any) => {
      if (response.result == 1) {
        this.aboutList = response.data;
        this.Linkedin_Link = this.aboutList.find((item: any) => item.title === 'Linkedin_Link');
        this.Facebook_Link = this.aboutList.find((item: any) => item.title === 'Facebook_Link');
        this.Instagram_Link = this.aboutList.find((item: any) => item.title === 'Instagram_Link');
      }
    }, error => {
      console.log(error);
    });
  }
  onClick(id: number) {
    // this.router.navigate(['public/public-dashboard/menu/'], {
    //   queryParams: { id },
    // });

    id == 1 ? this.router.navigate(['public/public-dashboard/about-us/']) : id == 2 ? this.router.navigate(['public/public-dashboard/contact-us/']) : id == 3 ? this.router.navigate(['public/public-dashboard/privacy-policy/'])
      : this.router.navigate(['public/public-dashboard/terms-of-use/']);
    window.scrollTo({ top: 0, behavior: 'smooth' });


  }
  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }



}
