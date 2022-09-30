import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createOrder } from './../models/createOrder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderStartService {

  constructor(private http: HttpClient) { }

  addOrder(postData: createOrder): Observable<createOrder> {
    return this.http.post<createOrder>('http://localhost:8080/order/', postData);
  }
}
