export class User {
    aadharId: string = '';
    name: string = '';
    dob: Date | null = null;
    email: string = '';
    phone: string = '';
    alternatePhone: string = '';
    fatherName: string = '';
    address: string = '';
    status: string = '';
    gender: string = '';
    institute: string ='';
    roomNumber: number = 0;
    admissionDate: Date | null = null;
    vacatedDate: Date | null = null;
    lastPaymentDate: Date | null = null;
    createdDate: Date | null = null;
    updatedDate: Date | null = null;
    hostel:String = "B1HMYT";
    fees:number = 0;
    amountPaid:number = 0;
    paymentType:string = '';
}
export class Payment{
    aadharId: string = '';
    fees:number = 0;
    amountPaid:number = 0;
    totalAmountPaid:number = 0;
    paymentType:string = '';
    lastPaymentDate: Date | null = null;
}
export const HOSTELS = [
    "B1AKSH",
    "B2HMYT" ,
    "G1NARYN",
]