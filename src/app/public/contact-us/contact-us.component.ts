import { Component, OnInit } from '@angular/core';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUs: any;
  constructor(private about_service: AboutPekerdjaService
  ) { }

  ngOnInit(): void {
    this.getDataByTitle();
  }

  getDataByTitle(): void {
    const params: any = {
      Contact_Us: 'Contact_Us'
    }
    this.about_service.getData(params).pipe().subscribe((response: any) => {
      if (response.result == 1) {
        this.contactUs = response.data[0];
      }
    }, error => {
      console.log(error);
    });
  }


}
