import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

enum CheckBoxType {
  box_1,
  box_2,
  box_3,
  NONE,
}

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss'],
})
export class PricingPageComponent implements OnInit {
  message: boolean = false;
  postJob: boolean = true;
  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType | any;

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void { }

  openModel(pricing: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      // size:'custom-width',
      windowClass: 'custom-backdrop custom-width-modal',
    };
    this.modalService.open(pricing, ngbModalOptions);
  }

  clickOnpostJob() {
    this.postJob = false;
    this.message = true;
  }

  reDirecttoHome() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('public/public-dashboard/home');
  }
  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }
}
