import { Page } from 'src/app/models/page';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ClientRegister } from '../models/clientRegister';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  findClientById(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/client/' + id);
  }

  addClient(postData: ClientRegister): Observable<ClientRegister> {
    console.log(postData);
    return this.http.post<ClientRegister>('http://localhost:8080/client/', postData);
  }

  getEstablishmentsHome(page: number): Observable<Page> {
    return this.http.get<Page>('http://localhost:8080/establishment/card/' + page)
  }

  getEstablishmentByName(s: string, page: number): Observable<Page>{
    return this.http.get<Page>('http://localhost:8080/establishment/search-name/' + s + '/' + page)
  }
}
