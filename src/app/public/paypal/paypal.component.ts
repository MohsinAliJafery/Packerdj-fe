import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  @Input() charges: any;
  @Output() closeDialog = new EventEmitter();
  @ViewChild('paymentRef') paymentRef!: ElementRef;


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {

      paypal.Buttons(
        {
          style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.charges,
                    currency_code: 'USD'
                  }
                }
              ]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              if (details.status === 'COMPLETED') {
                this.closeDialog.emit(details);

              }
            });
          },
          onError: (error: any) => {
            console.log(error);
          }
        }
      ).render(this.paymentRef?.nativeElement);

    }, 1000);

  }

}
