import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  emailList: any = []
  componentInView = new Subject();
  constructor(private email_service: EmailService, private router: Router) { }

  ngOnInit(): void {
    this.getEmails();
  }
  getEmails(): void {
    this.email_service.getEmails().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.emailList = response.emails;
      }
    }, error => {
      console.log(error);
    });
  }

  editEmail(id: any) {
    const url = `/admin/dashboard/email/edit?id=${id}`
    window.open(url, '_blank');
  }

}
