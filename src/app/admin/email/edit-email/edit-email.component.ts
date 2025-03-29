import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };

  id: any;
  componentInView = new Subject();
  emailContent: any = '';

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService, private email_service: EmailService, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.getEmailById(this.id);
      }
    });

  }

  getEmailById(id: any): void {
    this.email_service.getEmailById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.emailContent = response.email.content
    },

      error => {
        console.log(error);

      }

    );
  }


  updateEmail(): void {
    if (this.emailContent) {
      const params = {
        content: this.emailContent
      }
      this.email_service.updateEmail(params, this.id).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.toastr.success(response.message)
            this.router.navigate(['/admin/dashboard/email']);
          }
        },
      )

    } else {
      this.toastr.error('Provide valid content')
    }
  }


}
