import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?:{
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    } | undefined;
  }): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, body: any, options?: any){
    return this.http.post<T>(url, body, options)
  }

  put<T>(url: string, body: any, options?: any){
    return this.http.put<T>(url, body, options)
  }

  delete<T>(url: string, options?:any): Observable<HttpEvent<T>>{
    return this.http.delete<T>(url, options);
  }
}
