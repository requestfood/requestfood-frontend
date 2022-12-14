import { CreateOrder } from '../models/order/createOrder';
import { ClientUpdate, getClientUpdate } from '../models/user/UserUpdate';
import { ClientOrders } from '../models/_client/ClientWithOrders';
import { Page } from 'src/app/models/core/page';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ClientRegister } from '../models/_client/clientRegister';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientRefresh = new EventEmitter<string>()

  endPointClient: string = 'http://localhost:8080/client/'
  endPointEstablishment: string = 'http://localhost:8080/establishment/'

  constructor(private http: HttpClient) {}

  //  POST  //

  addClient(postData: ClientRegister): Observable<ClientRegister> {
    console.log(postData);
    return this.http.post<ClientRegister>(this.endPointClient, postData);
  }

  //  GET  //

  getClientWithOrders(id: Number): Observable<ClientOrders>{
    return this.http.get<ClientOrders>(this.endPointClient + 'orders/' + id);
  }
  getClientWithOrdersByEstablishmentName(id: Number, name: String): Observable<ClientOrders>{
    return this.http.get<ClientOrders>(this.endPointClient + 'orders/' + id + '/establishment-name/' + name);
  }
  getClientWithOrdersByOrderStatus(id: Number, status: String): Observable<ClientOrders>{
    return this.http.get<ClientOrders>(this.endPointClient + 'orders/' + status + '/' + id);
  }

  getClientWithCurrentOrder(id: Number): Observable<any>{
    return this.http.get<any>(this.endPointClient + 'current-order/' + id);
  }


  getEstablishmentsHome(page: Number): Observable<Page> {
    return this.http.get<Page>(this.endPointEstablishment+ 'card/' + page)
  }

  getEstablishmentByName(string: string, page: Number): Observable<Page>{
    return this.http.get<Page>(this.endPointEstablishment + 'search-name/' + string + '/' + page)
  }

  getOneClient(id: Number):Observable<getClientUpdate>{
    return this.http.get<getClientUpdate>(this.endPointClient + id)
  }

  //  PUT  //

  updateClient(putData: ClientUpdate, id: Number): Observable<String>{
    return this.http.put<String>(this.endPointClient + id, putData)
  }

}
