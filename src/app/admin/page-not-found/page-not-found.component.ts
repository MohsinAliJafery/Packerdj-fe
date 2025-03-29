import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @ViewChild('updateProfile', { static: true }) updateProfile:
  | ElementRef
  | undefined;
  constructor(private modalService: NgbModal,private router:Router) { }

  ngOnInit(): void {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered:true,
      windowClass: 'custom-backdrop pageNotfound-modal',
    };
    this.modalService.open(this.updateProfile, ngbModalOptions);
  }

  onClick(){
    this.router.navigateByUrl('/admin/dashboard/candidate')
    this.modalService.dismissAll()
  }

}
