import { Component, OnInit,} from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {
  showSessionForm = true;
  infoForm = false;
  PaymentCard = false;
  CompletionCard = false;

  selectedDate: any;
  currentYear: any;
  cardValue: any = 0;
  timeCardValue: any = 0;
  selectedTime: any;
  
  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }
  openModel(abc: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      // size:'custom-width',
      windowClass: 'custom-backdrop custom-candidatewidth-modal',
    };
    this.modalService.open(abc, ngbModalOptions);
  }

  dismissAll() {
    this.modalService.dismissAll();
  }

  

  

  
}
