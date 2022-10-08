import { CreateOrder } from '../models/order/createOrder';
import { Observable } from 'rxjs';
import { itemOrder } from '../models/order/itemOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  currentOrder: CreateOrder = {
    idEstablishment: 0,
    idClient: 0
  }

  setCurrentOrder(currentOrder: CreateOrder) {
    this.currentOrder = currentOrder
  }

  getCurrentOrder() {
    return this.currentOrder
  }

  constructor(private http: HttpClient) { }

  addItem(postData: itemOrder): Observable<itemOrder> {
    return this.http.post<itemOrder>('http://localhost:8080/item', postData);
  }
}
