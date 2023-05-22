import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Payment } from '../models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, OnDestroy {

  paymentForm!: FormGroup;
  paymentFormComponentDestroy$ = new Subject<void>();
  payments!: MatTableDataSource<Payment>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isLoading = false;

  displayedColumns = ['fees', 'amountPaid', 'lastPaymentDate', 'paymentType'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private userService:UserService,
  private notifyService:NotificationService, private dialogRef: MatDialogRef<PaymentFormComponent>, private datePipe: DatePipe){
    
  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      lastPaymentDate: ['', Validators.required],
      fees: ['', Validators.required],
      amountPaid: ['', Validators.required],
      totalAmountPaid: [''],
      paymentType: ['', Validators.required],
    });

    this.userService.getPaymentByAadhar(this.data.aadharId).pipe(takeUntil(this.paymentFormComponentDestroy$)).subscribe((existingPayment)=>{
      if(existingPayment) {
        this.paymentForm.patchValue({
          lastPaymentDate: this.datePipe.transform(existingPayment.lastPaymentDate, 'yyyy-MM-dd'),
          fees: existingPayment.fees,
          amountPaid: existingPayment.amountPaid,
          totalAmountPaid: existingPayment.totalAmountPaid,
          paymentType: existingPayment.paymentType,
        });
      }
    }, (error)=>{
      this.notifyService.showError(error.error.message);
    });

    this.getPaymentsHistory();
  }

  getPaymentsHistory(){
    this.userService.getPaymentsHistoryByAadhar(this.data.aadharId).pipe(takeUntil(this.paymentFormComponentDestroy$)).subscribe((resp)=>{
      if(resp) {
        const payments = resp.map((data:any) => {
          return {
            aadharId: data.aadharId,
            fees: data.updatedFields.fees,
            amountPaid: data.updatedFields.amountPaid,
            paymentType: data.updatedFields.paymentType,
            lastPaymentDate: data.updatedFields.lastPaymentDate
          }
        });
        this.payments = new MatTableDataSource(payments);
        this.payments.sort = this.sort;
        this.payments.paginator = this.paginator;
      }
    }, (error)=>{
      this.notifyService.showError(error.error.message);
    });
  }

  onInputAmount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = parseFloat(inputElement.value);

    if (inputValue < 0) {
      inputElement.value = '0';
    }
  }

  onSave() {
    if (this.paymentForm.valid) {
      this.isLoading = true;
      let payment = new Payment();
      payment = {...this.paymentForm.value};
      payment.lastPaymentDate = payment.lastPaymentDate ? payment.lastPaymentDate : null;
      this.userService.updatePayment(payment, this.data.aadharId).pipe(takeUntil(this.paymentFormComponentDestroy$)).subscribe((resp:any)=>{
        this.notifyService.showSuccess('Payment updated successfully');
        this.dialogRef.close('success');
        this.isLoading = false;
      }, (error)=>{
        this.notifyService.showError(error.error.message);
        this.dialogRef.close();
        this.isLoading = false;
      });
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }

  onCancel() {
    this.paymentForm.reset();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.paymentFormComponentDestroy$.next();
    this.paymentFormComponentDestroy$.complete();
  }

}
