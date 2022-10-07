import { createOrder } from './../models/createOrder';
import { Observable } from 'rxjs';
import { itemOrder } from './../models/itemOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  currentOrder: createOrder = {
    idEstablishment: 0,
    idClient: 0
  }

  setCurrentOrder(currentOrder: createOrder) {
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
