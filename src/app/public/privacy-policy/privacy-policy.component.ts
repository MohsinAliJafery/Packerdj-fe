import { Component, OnInit } from '@angular/core';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  PrivacyPolicy: any;
  constructor(private about_service: AboutPekerdjaService
  ) { }

  ngOnInit(): void {
    this.getDataByTitle();
  }

  getDataByTitle(): void {
    const params: any = {
      Privacy_Policy: 'Privacy_Policy'
    }
    this.about_service.getData(params).pipe().subscribe((response: any) => {
      if (response.result == 1) {
        this.PrivacyPolicy = response.data[0];
      }
    }, error => {
      console.log(error);
    });
  }

}
