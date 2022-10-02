import { EstablishmentCard } from './../models/establishmentCard';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createOrder } from './../models/createOrder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderStartService {

  currentEstablishment:EstablishmentCard = {
    id: 0,
    name: "",
    image: ""
  }

  public setCurrentEstablishment(currentEstablishment: EstablishmentCard){
    this.currentEstablishment = currentEstablishment;
  }
  public getCurrentEstablishment(): EstablishmentCard{
    return this.currentEstablishment;
  }

  constructor(private http: HttpClient) { }

  addOrder(postData: createOrder): Observable<createOrder> {
    return this.http.post<createOrder>('http://localhost:8080/order/', postData);
  }
}
