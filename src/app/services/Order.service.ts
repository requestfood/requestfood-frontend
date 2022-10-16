import { OrderControl } from './../models/order/orderControl';
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

  amountOrder = new EventEmitter<number>()
  novaComanda =  new EventEmitter<any>()

  currentEstablishment:EstablishmentCard = {
    id: 0,
    name: "",
    image: File
  }


  //  LOCAL  //  

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

  //  POST  //

  postOrder(postData: CreateOrder): Observable<CreateOrder> {
    return this.http.post<CreateOrder>('http://localhost:8080/order/', postData);
  }

  //  GET  //
  
  getOrderDetails(id: Number): Observable<OrderDetails>{
    return this.http.get<OrderDetails>('http://localhost:8080/order/' + id);
  }

  getOrderControl(id: Number): Observable<OrderControl>{
    return this.http.get<OrderControl>('http://localhost:8080/establishment/order-control/' + id)
  }

  //  PUT  //
  
  updateStatusOrder(status: string, id: number): Observable<any>{
    return this.http.post<any>('http://localhost:8080/order/' + status + '/' + id, null)
  }

  //  DELETE  // 
  
  deleteOrder(id: number): Observable<String>{
    return this.http.delete<String>('http://localhost:8080/order/' + id)
  }
  
}
