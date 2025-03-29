import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coaching-details',
  templateUrl: './coaching-details.component.html',
  styleUrls: ['./coaching-details.component.scss']
})
export class CoachingDetailsComponent implements OnInit {
  @ViewChild('CoachingServiceModal', { static: true }) CoachingServiceModal: ElementRef | undefined;
  @ViewChild('paymentRef') paymentRef!: ElementRef;


  bookingForm!: FormGroup;
  showSessionForm = true;
  infoForm = false;
  PaymentCard = false;
  CompletionCard = false;
  selectedDate: any;
  currentYear: any;
  cardValue: any;
  paymentCardValue = 1;
  timeCardValue: any;
  serviceValue: any;
  selectedTime: any;
  selectedService: any;
  componentInView = new Subject();
  baseURL = environment.API_URL;
  coach: any;
  backendTime: any;
  formattedTime: any;
  coach_id: any;
  user_id: any;
  timeArray: any = [];
  dateOccurences: any;
  totalSlots: any;
  viewAllBtn: boolean = false;
  currencyRate: any

  constructor(private modalService: NgbModal,
    private global_service: GlobalServiceService,
    private booking_service: BookingService, private toastr: ToastrService, private formBuilder: FormBuilder, private route: ActivatedRoute, private coach_service: CoachesService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear()
    this.route.queryParams.subscribe(params => {
      this.coach_id = params['id'];
      if (this.coach_id) {
        this.getCoachByID(this.coach_id);
      }
    });
    let user: any = localStorage.getItem('user');
    let user_id = JSON.parse(user);
    this.user_id = user_id._id


  }

  getExchangeRate(amount: any): void {
    this.global_service
      .getExchangeRate(amount)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          this.selectedService.chargesInUSD = response.conversion_result.toFixed(2);

        }
      );
  }
  getCoachByID(userId: any): void {
    this.coach_service
      .getCoachByID(userId)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          this.coach = response.coach;

          const currentDate = new Date();
          this.coach.slot = this.coach.slot.filter((slot: any) => {
            const slotDateTime = new Date(`${slot.date} ${slot.from}`);
            return slotDateTime > currentDate && slot.status == "Active";
          });
          this.coach.slot.map((i: any) => {
            const filteredSlots = this.coach.slot.filter((slot: any) => slot.date === i.date);
            this.dateOccurences = filteredSlots.length;
            i.dateOccurences = this.dateOccurences
          })

          this.coach.slot.map((i: any) => {
            // Convert to 12-hour format and add 'PM' if time is greater than 12
            const hour = +i.from.split(':')[0];
            const minute = i.from.split(':')[1];
            const isPM = hour >= 12;
            const formattedHour = hour > 12 ? hour - 12 : hour;
            i.from = `${formattedHour}:${minute.padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;

            const hour2 = +i.to.split(':')[0];
            const minute2 = i.to.split(':')[1];
            const isPM2 = hour2 >= 12;
            const formattedHour2 = hour2 > 12 ? hour2 - 12 : hour2;
            i.to = `${formattedHour2}:${minute2.padStart(2, '0')} ${isPM2 ? 'PM' : 'AM'}`;
          })
          this.coach.slot = this.coach.slot.reduce((accumulator: any[], currentSlot: any) => {
            const existingSlot = accumulator.find((slot: any) => slot.date === currentSlot.date);
            if (!existingSlot) {
              accumulator.push({ date: currentSlot.date, dateOccurences: currentSlot.dateOccurences, times: [currentSlot.from] });
            }
            else {
              existingSlot.times.push(currentSlot.from);
            }
            return accumulator;
          }, []);
          this.totalSlots = this.coach.slot;
          this.viewAllBtn = this.totalSlots?.length > 3 ? true : false;
          this.coach.slot = this.coach.slot.slice(0, 3);

        }
      );
  }
  ViewAllSlots() {
    this.coach.slot = this.totalSlots;
    this.viewAllBtn = false;
  }

  OpenCoachingModal() {
    this.bookingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      note: ['', [Validators.required]],
      coach_id: [this.coach_id],
      user_id: [this.user_id],
      slotDate: [''],
      slotTime: [''],
      service: [''],
      transaction: [''],
      booking_status: [''],
      category: [this.coach.category],

    })

    if (this.serviceValue >= 0) {
      let ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalSize-sm',
        centered: true,
      };
      this.modalService.open(this.CoachingServiceModal, ngbModalOptions);
    }
    else {
      this.toastr.error('Select service for booking')
    }
  }

  CloseModel(): void {
    this.modalService.dismissAll();
    this.showSessionForm = true;
    this.CompletionCard = false;
    this.bookingForm.reset();
    this.cardValue = -1;
    this.timeCardValue = -1;
    this.serviceValue = -1;
    this.paymentCardValue = 1;
    this.timeArray = [];

  }

  selectDate(v: any, i: any) {
    this.timeCardValue = -1;
    this.timeArray = v.times;
    this.cardValue = i;
    this.selectedDate = v.date;
  }

  selectTime(v: any, i: any) {
    this.timeCardValue = i;
    this.selectedTime = v;
  }
  selectService(v: any, i: any) {
    this.serviceValue = i;
    this.selectedService = v;
  }
  onBookSessionClick() {
    if (this.cardValue >= 0 && this.timeCardValue >= 0) {
      this.showSessionForm = false;
      this.infoForm = true;
    }
    else {
      this.toastr.error('Select date and time for booking')
    }
  }
  onBookingSummaryClick() {
    if (this.bookingForm.valid) {
      this.infoForm = false;
      this.PaymentCard = true;
      const percentToAdd = 10;
      const charges = this.selectedService.charges.replace(/,/g, '');
      const percentageAmount = (percentToAdd / 100) * charges;
      const newTotalPayment = +charges + percentageAmount;
      this.getExchangeRate(newTotalPayment);
    }
    else {
      this.toastr.error("Provide all details!", "Error !!",);
    }
  }

  onPaypalClick(value: any) {
    this.paymentCardValue = value;
  }

  goToSessionForm() {
    this.showSessionForm = true;
    this.infoForm = false;
  }
  goToBookingForm() {
    this.infoForm = true;
    this.PaymentCard = false;
  }


  addBooking() {
    this.bookingForm?.get('slotDate')?.setValue(this.selectedDate);
    this.bookingForm?.get('slotTime')?.setValue(this.selectedTime);
    this.bookingForm?.get('service')?.setValue(this.selectedService);


    if (this.paymentCardValue == 1) {
      this.bookingForm?.get('booking_status')?.setValue('PENDING');
    }
    if (this.paymentCardValue == 2 && this.bookingForm?.value?.transaction?.status == "COMPLETED") {
      this.bookingForm?.get('booking_status')?.setValue('COMPLETED');
    }
    else if (this.paymentCardValue == 2 && this.bookingForm?.value?.transaction?.status != "COMPLETED") {
      this.toastr.error("You have not done payment yet", "Error !!",);
      return
    }

    this.booking_service.addBooking(this.bookingForm.value)
      .pipe(takeUntil(this.componentInView))
      .subscribe(
        (response) => {
          if (response.result == 1) {
            this.toastr.success(response.message);
            this.PaymentCard = false;
            this.CompletionCard = true;
          }

        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );


    // else {
    //   this.toastr.error("You have not done payment yet", "Error !!",);
    // }

  }

  catchResponse(data: any) {
    this.bookingForm?.get('transaction')?.setValue(data);
    this.addBooking();
  }

}
