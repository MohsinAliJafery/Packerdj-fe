import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
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
    this.router.navigate(['public/public-dashboard/menu/'], { queryParams: { id } });
  }
  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
}
