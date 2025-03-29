import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AboutPekerdjaService } from 'src/app/services/aboutPekerdja.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };

  id: any;
  componentInView = new Subject();
  aboutContent: any = '';
  label: any;
  url: boolean = false;

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService, private about_service: AboutPekerdjaService, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.getDataById(this.id);
      }
    });

  }

  getDataById(id: any): void {
    this.about_service.getDataById(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.aboutContent = response.data.content
      this.label = response.data.title
      if (this.label == 'Facebook_Link' || this.label == 'Instagram_Link' || this.label == 'Linkedin_Link' || this.label == 'Contact_Us') {
        this.url = true
      }
    },

      error => {
        console.log(error);

      }

    );
  }


  updateData(): void {
    if (this.aboutContent) {
      const params = {
        content: this.aboutContent
      }
      this.about_service.updateData(params, this.id).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.toastr.success(response.message)
            this.router.navigate(['/admin/dashboard/about']);
          }
        },
      )

    } else {
      this.toastr.error('Provide valid content')
    }
  }


}
