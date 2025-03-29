import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { FaqsService } from 'src/app/services/faqs.service';
import { GlobalServiceService } from 'src/app/services/global-service.service';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faqs-list.component.html',
  styleUrls: ['./faqs-list.component.scss']
})
export class FaqsListComponent implements OnInit {
  panelOpenState = false;
  faqList: any;
  componentInView = new Subject();

  constructor(
    private router: Router,
    private faq_Service: FaqsService) {

  }

  ngOnInit(): void {
    this.getFaqs()
  }

  editFaqs(id: any) {
    const url = `/admin/dashboard/faqs/add?id=${id}`
    window.open(url, '_blank');
  }

  onCreate() {
    let id = "create";
    this.router.navigateByUrl('/admin/dashboard/faqs/' + id);
  }

  getFaqs(): void {
    this.faq_Service.getFaqs().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.faqList = response.faqs;
      }
    }, error => {
      console.log(error);
    });
  }


}
