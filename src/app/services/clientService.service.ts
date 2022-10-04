import { ClientUpdate, getClientUpdate } from '../models/user/UserUpdate';
import { ClientOrders } from './../models/_client/ClientWithOrders';
import { Page } from 'src/app/models/core/page';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ClientRegister } from '../models/_client/clientRegister';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  endPointClient: string = 'http://localhost:8080/client/'
  endPointEstablishment: string = 'http://localhost:8080/establishment/'

  constructor(private http: HttpClient) {}

  findClientById(id: number): Observable<any>{
    return this.http.get<any>(this.endPointClient + id);
  }

  //  POST  //

  addClient(postData: ClientRegister): Observable<ClientRegister> {
    console.log(postData);
    return this.http.post<ClientRegister>(this.endPointClient, postData);
  }

  //  GET  //

  getClientWithOrders(id: number): Observable<ClientOrders>{
    return this.http.get<ClientOrders>(this.endPointClient + 'orders/' + id);
  }

  getEstablishmentsHome(page: number): Observable<Page> {
    return this.http.get<Page>(this.endPointEstablishment+ 'card/' + page)
  }

  getEstablishmentByName(string: string, page: number): Observable<Page>{
    return this.http.get<Page>(this.endPointEstablishment + 'search-name/' + string + '/' + page)
  }

  getClientProfileUpdate(id: number):Observable<getClientUpdate>{
    return this.http.get<getClientUpdate>(this.endPointClient + id)
  }

  //  PUT  //

  updateClient(putData: ClientUpdate, id: number): Observable<String>{
    return this.http.put<String>(this.endPointClient + id, putData)
  }

}
