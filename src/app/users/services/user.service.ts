import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Payment, User } from '../models/user.model';
const mockUsers = [
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'8574998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  },
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'8574998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  },
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'8574998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  },
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'8574998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  },
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'8574998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  },
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'8574998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  },
  {
    aadharId: '11',
    name: 'shashi',
    dob: new Date("1991-03-21"),
    email: 'shashikanth@gmail.com',
    phone:'8374868254',
    alternatePhone:'',
    fatherName: 'shanker',
    address: 'hyd',
    status: '',
    gender: 'male',
    institute: 'CTS',
    roomNumber: 11,
    admissionDate: new Date("01-04-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-05-2023")
  },
  {
    aadharId: '12',
    name: 'sam',
    dob: new Date("1989-04-21"),
    email: 'sam@gmail.com',
    phone:'9172998254',
    alternatePhone:'',
    fatherName: 'john',
    address: 'sec',
    status: '',
    gender: 'female',
    institute: 'Infy',
    roomNumber: 9,
    admissionDate: new Date("01-03-2023"),
    vacatedDate: null,
    lastPaymentDate:  new Date("01-04-2023")
  }
]
@Injectable({
  providedIn: 'root'
})
export class UserService {

  domainUrl = "http://localhost:3000/api";

  constructor(private httpService:HttpClientService) { }

  getAllUsers(){
    let url = this.domainUrl + '/users';
    return this.httpService.get(url);
  }

  saveUser(user:User){
    let url = this.domainUrl + '/users';
    return this.httpService.post<any>(url, user);
  }

  updateUser(user:User, aadharId:string){
    let url = this.domainUrl + '/users/'+aadharId;
    return this.httpService.put<any>(url, user);
  }

  updatePayment(payment:Payment, aadharId:string){
    let url = this.domainUrl + '/payment/'+aadharId;
    return this.httpService.put<any>(url, payment);
  }

  getPaymentByAadhar(aadharId:string){
    let url = this.domainUrl + '/payment/find/'+aadharId;
    return this.httpService.get<Payment>(url);
  }

  getPaymentsHistoryByAadhar(aadharId:string){
    let url = this.domainUrl + '/payment/history/'+aadharId;
    return this.httpService.get<any>(url);
  }
}
