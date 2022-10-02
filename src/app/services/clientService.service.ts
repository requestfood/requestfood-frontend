import { ClientUpdate } from './../models/UserUpdate';
import { ClientOrders } from './../models/ClientWithOrders';
import { Page } from 'src/app/models/page';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ClientRegister } from '../models/clientRegister';

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

  //  PUT  //

  updateClient(clientUpdate: ClientUpdate, id: number): Observable<String>{
    return this.http.put<String>(this.endPointClient + id, clientUpdate)
  }

}
