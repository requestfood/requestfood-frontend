import { OrderDetails } from './../models/order/OrderDetails';
import { EstablishmentCard } from '../models/establishment/establishmentCard';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrder } from '../models/order/createOrder';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http: HttpClient) { }

  novaComanda =  new EventEmitter<any>()

  currentEstablishment:EstablishmentCard = {
    id: 0,
    name: "",
    image: ""
  }

  getOrder(): any{
    return localStorage.getItem('order')
  }
  setOrder(order: any){
    localStorage.setItem('order', JSON.stringify(order))
  } 
  setCurrentEstablishment(currentEstablishment: EstablishmentCard){
    this.currentEstablishment = currentEstablishment;
  }
  getCurrentEstablishment(): EstablishmentCard{
    return this.currentEstablishment;
  }


  postOrder(postData: CreateOrder): Observable<CreateOrder> {
    return this.http.post<CreateOrder>('http://localhost:8080/order/', postData);
  }



  getOrderDetails(id: Number): Observable<OrderDetails>{
    return this.http.get<OrderDetails>('http://localhost:8080/order/' + id);
  }
}
