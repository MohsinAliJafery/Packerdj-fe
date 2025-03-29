import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterVisibleService } from 'src/app/footer-visible.service';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('updateProfile', { static: true }) updateProfile: | ElementRef | undefined;
  updateProfileForm!: FormGroup;
  componentInView = new Subject();
  baseURl = environment.API_URL;
  profilePic: File | undefined;
  previewImage: string | undefined;
  filesarray: any = [];
  showFortcel: boolean = true;
  showAnalogit: boolean = false;
  showForm: boolean = false;
  showList: boolean = true;
  expand: boolean = false;
  aTags: boolean = false;
  socialDiv: boolean = true;
  isProfile2: boolean = true;
  user: any;
  constructor(public footerService: FooterVisibleService, private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService, private modalService: NgbModal, private user_service: UserService
  ) {
  }

  ngOnInit(): void {
    let data: any = localStorage.getItem('user');
    this.user = JSON.parse(data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 768) {
      this.expand = false;
    }
  }

  onNavigate() {

    this.footerService.isFirstFooterShow = false;
    this.footerService.issecondFooterShow = true;
    this.footerService.isProfile = false
    this.footerService.isRouteShow = true


  }
  onNavigateSmall() {
    this.footerService.isRouteShow = true
    this.footerService.isProfile = false
    this.footerService.isFirstFooterShow = false;
    this.footerService.issecondFooterShow = true;

  }
  onClick() {
    this.expand = false;
  }

  SignOut() {
    localStorage.clear()
    this.router.navigateByUrl('auth/login');
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (event.target.files[0].size <= maxSizeInBytes) {
        const file = event.target.files[0];
        this.filesarray[0] = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result as string;
        }
        reader.readAsDataURL(file);
      }
      else {
        this.toastr.error('File size is above 2mb')
      }

    }

  }

  updateProfileClick() {
    if (this.updateProfileForm.valid) {

      this.user_service.updateUser(this.updateProfileForm.value, this.filesarray)
        .pipe(takeUntil(this.componentInView))
        .subscribe(
          (response) => {
            if (response.result == 1) {
              this.toastr.success("Profile has been updated!", "Successfully!!",);
              this.updateProfileForm.reset();
              this.filesarray = [];
              this.modalService.dismissAll();
              this.user.profile = response.updatedProfile;
              localStorage.setItem('user', JSON.stringify(this.user));
            }

          },
          (error) => {
            console.log(error);

          }
        );

    }
    else {
      this.toastr.error("Provide all details!", "Error !!",);
      this.updateProfileForm.markAllAsTouched();
    }
  }

  dismissAll() {
    this.filesarray = [];
    this.previewImage = '';
    this.updateProfileForm.reset();
    this.modalService.dismissAll();
  }

  openUpdateModal() {

    this.updateProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      _id: [this.user._id]
    });
    this.getUserById(this.user._id);

    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      windowClass: 'custom-backdrop custom-width-modal',
    };
    this.modalService.open(this.updateProfile, ngbModalOptions);

  }
  getUserById(id: any) {
    this.user_service.getUserById(id)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          if (response.result == 1) {
            this.profilePic = response?.user?.file?.path;
            this.updateProfileForm.patchValue(response.user)
          }

        },
        (error) => {
          console.log(error);

        }
      );
  }
}
