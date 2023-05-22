import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['aadharId', 'name', 'phone', 'gender', 'lastPaymentDate', 'view', 'payment'];
  users!: MatTableDataSource<User>;
  filterDate!:Date;
  filterGender: string = '';
  filterName = '';
  filterPhone = '';
  isLoading = true;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  loading = true;
  usersComponentDestroy$ = new Subject<void>();
  constructor(private userService:UserService, public dialog: MatDialog, private notifyService: NotificationService){
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.isLoading = true;
    this.userService.getAllUsers().pipe(takeUntil(this.usersComponentDestroy$)).subscribe((resp:any)=>{
      this.users = new MatTableDataSource(resp);
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
      this.isLoading = false;
    }, (error)=>{
      this.notifyService.showError(error.message);
      this.isLoading = false;
    });
  }

  applyFilter() {
    this.users.filterPredicate = (data: any) => {
      const nameMatch = data.name.toLowerCase().includes(this.filterName.toLowerCase());
      const phoneMatch = data.phone.toLowerCase().includes(this.filterPhone.toLowerCase());
      const genderMatch = !this.filterGender || data.gender.toLowerCase() === this.filterGender.toLowerCase();
  
      if (this.filterDate) {
        const lastPaymentDate = new Date(data.lastPaymentDate);
        const lastPaymentDateMatch =
          this.filterDate.getFullYear() === lastPaymentDate.getFullYear() &&
          this.filterDate.getMonth() === lastPaymentDate.getMonth() &&
          this.filterDate.getDate() === lastPaymentDate.getDate();
  
        return nameMatch && phoneMatch && genderMatch && lastPaymentDateMatch;
      }
  
      return nameMatch && phoneMatch && genderMatch;
    };
  
    this.users.filter = JSON.stringify({
      name: this.filterName,
      phone: this.filterPhone,
      gender: this.filterGender,
      lastPaymentDate: this.filterDate
    });
  
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  openDialog(isEdit:boolean, user?:User) {
    const dialogRef = this.dialog.open(UserFormComponent, {disableClose:true});
    if(user){
      dialogRef.componentInstance.userData = user;
    }
    dialogRef.componentInstance.isEditing = isEdit;

    dialogRef.afterClosed().pipe(takeUntil(this.usersComponentDestroy$)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.getUsers();
      }
    });
  }

  openPaymentDialog(user:User) {
    const dialogRef = this.dialog.open(PaymentFormComponent, {data:user, disableClose:true});

    dialogRef.afterClosed().pipe(takeUntil(this.usersComponentDestroy$)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.getUsers();
      }
    });
  }

  ngOnDestroy(): void {
    this.usersComponentDestroy$.next();
    this.usersComponentDestroy$.complete();
  }
  
}
