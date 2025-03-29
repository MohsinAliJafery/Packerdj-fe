import { Component, OnInit } from '@angular/core';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  termsOfUse: any;
  constructor(private about_service: AboutPekerdjaService
  ) { }

  ngOnInit(): void {
    this.getDataByTitle();
  }

  getDataByTitle(): void {
    const params: any = {
      Terms_Of_Use: 'Terms_Of_Use'
    }
    this.about_service.getData(params).pipe().subscribe((response: any) => {
      if (response.result == 1) {
        this.termsOfUse = response.data[0];
      }
    }, error => {
      console.log(error);
    });
  }

}
