import { Component, OnInit } from '@angular/core';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  AboutUs: any;
  constructor(private about_service: AboutPekerdjaService
  ) { }

  ngOnInit(): void {
    this.getDataByTitle();
  }

  getDataByTitle(): void {
    const params: any = {
      About_Us: 'About_Us'
    }
    this.about_service.getData(params).pipe().subscribe((response: any) => {
      if (response.result == 1) {
        this.AboutUs = response.data[0];
      }
    }, error => {
      console.log(error);
    });
  }


}
