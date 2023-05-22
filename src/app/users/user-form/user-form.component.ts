import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HOSTELS, User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() isEditing: boolean = false;
  @Input() userData: any;
  isLoading = false;
  userForm!: FormGroup;
  hostels = HOSTELS;
  userFormComponentDestroy$ = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private userService:UserService, private notifyService: NotificationService,
    private dialogRef: MatDialogRef<UserFormComponent>, private datePipe: DatePipe) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.userData?.name || '', Validators.required],
      email: [this.userData?.email || '', [Validators.email]],
      phone: [this.userData?.phone || '', [Validators.required, this.phoneValidator]],
      alternatePhone: [this.userData?.alternatePhone || '', [Validators.required, this.phoneValidator]],
      gender: [this.userData?.gender || 'male', Validators.required],
      status: [this.userData?.status || 'Joined', Validators.required],
      dob: [this.userData? this.formatDate(this.userData.dob) : '' || '', Validators.required],
      aadharId: [this.userData?.aadharId || '', Validators.required],
      fatherName: [this.userData?.fatherName || '', Validators.required],
      address: [this.userData?.address || '', [Validators.required, Validators.maxLength(250)]],
      institute: [this.userData?.institute || '', Validators.required],
      hostel: [this.userData?.hostel || 'G1NARYN', Validators.required],
      roomNumber: [this.userData?.roomNumber || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      admissionDate: [this.userData? this.formatDate(this.userData.admissionDate) : '' || '', Validators.required],
      vacatedDate: [this.userData? this.formatDate(this.userData.vacatedDate) : '' || ''],
      fees: [this.userData?.fees || '', Validators.required],
    });
  }

  formatDate(date:Date | null){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumberRegex = /^[0-9]{10}$/; // Regular expression for a 10-digit phone number
    const value = control.value;

    if (value && !phoneNumberRegex.test(value)) {
      return { invalidPhone: true };
    }

    return null;
  }

  onSave() {
    if (this.userForm.valid) {
      this.isLoading = true;
      if(!this.isEditing){
        let user = new User();
        user = {fees:0,amountPaid:0,lastPaymentDate:null,paymentType:'',...this.userForm.value};
        user.dob = user.dob ? user.dob : null;
        user.admissionDate = user.admissionDate ? user.admissionDate : null;
        user.lastPaymentDate = user.lastPaymentDate ? user.lastPaymentDate : null;
        user.vacatedDate = user.vacatedDate ? user.vacatedDate : null;
        this.userService.saveUser(user).pipe(takeUntil(this.userFormComponentDestroy$)).subscribe((resp:any)=>{
          this.notifyService.showSuccess('Saved successfully');
          this.dialogRef.close('success');
          this.isLoading = false;
        }, (error)=>{
          this.notifyService.showError(error.error.message);
          this.isLoading = false;
        });
      } else {
        let user = new User();
        user = {...this.userForm.value};
        user.dob = user.dob ? user.dob : null;
        user.admissionDate = user.admissionDate ? user.admissionDate : null;
        user.vacatedDate = user.vacatedDate ? user.vacatedDate : null;
        this.userService.updateUser(user, this.userData.aadharId).pipe(takeUntil(this.userFormComponentDestroy$)).subscribe((resp:any)=>{
          this.notifyService.showSuccess('Updated successfully');
          this.dialogRef.close('success');
          this.isLoading = false;
        }, (error)=>{
          this.notifyService.showError(error.error.message);
          this.isLoading = false;
        });
      }
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }

  onInputAmount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = parseFloat(inputElement.value);

    if (inputValue < 0) {
      inputElement.value = '0';
    }
  }

  onCancel() {
    this.userForm.reset();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.userFormComponentDestroy$.next();
    this.userFormComponentDestroy$.complete();
  }
}

