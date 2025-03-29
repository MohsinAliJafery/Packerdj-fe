import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.scss']
})
export class MyResumeComponent implements OnInit {
  selectedFile: File | null | undefined;
  componentInView = new Subject();
  user: any;
  resumeList: any;
  pdfSrc: any | undefined;
  baseURL = environment.API_URL;


  constructor(private user_service: UserService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    let data: any = localStorage.getItem('user');
    this.user = JSON.parse(data);
    this.getResumeData()

  }

  getResumeData() {
    this.user_service.getUserResume(this.user._id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          if (response.result == 1) {
            this.resumeList = response.resumes;

          }

        },
        (error) => {
          console.log(error);

        }
      );
  }

  downloadPdf(data: any) {
    this.pdfSrc = this.baseURL + data.path;
    const link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = data.originalname;
    link.click();
  }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (event.target.files[0].size <= maxSizeInBytes) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
          this.user_service.updateUserResume(this.user._id, this.selectedFile)
            .pipe(takeUntil(this.componentInView))
            .subscribe(
              (response) => {
                if (response.result == 1) {
                  this.toastr.success("Resume has been uploaded!", "Successfully!!",);
                  this.getResumeData();

                }
              },
              (error) => {
                console.log(error);

              }
            );

        }
      }
      else {
        this.toastr.error('File size is above 5mb')
      }
    }

  }
}
