import { OrderService } from './Order.service';
import { ContactUpdate, PasswordUpdate } from '../models/user/UserUpdate';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UserLogin } from '.././models/user/userLogin';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mostrarMenuLogin = new EventEmitter<boolean>()
  
  novoUserAutenticado = new EventEmitter<any>()
  
  public setUserAutenticado(user: any){
    localStorage.setItem('u', JSON.stringify(user))
  }
  public getUserAutenticado(): any{
    return localStorage.getItem('u')
  }

  existsUser(): boolean{
    if(localStorage.getItem('u'))
        return true
    else
      return false
    
  }

  isEstablishment(): boolean{

    if(this.existsUser()){
      if(JSON.parse(this.getUserAutenticado()).role == "ESTABLISHMENT_USER")
          return true;
    }
    
    return false;
  }

  isClient(): boolean{

    if(this.existsUser()){
      if(JSON.parse(this.getUserAutenticado()).role == "CLIENT_USER")
          return true;
    }
    
    return false;
  }

  public logout(): boolean{
    localStorage.removeItem('u')
    localStorage.removeItem('order')

    let holder = {
      id: 0,
      role: ""
    }

    this.novoUserAutenticado.emit(holder)

    if(!this.existsUser()){
      this.mostrarMenuLogin.emit(false)
      return true
    }else
      return false
  }

  constructor(private http: HttpClient, private orderService: OrderService) {
  }


  //  POST  //

  fazerLogin(postData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:8080/user/login/', postData);
  }

  //  PUT  //

  updateContact(contactUpdate: ContactUpdate, id: number): Observable<any>{
    return this.http.put<any>('http://localhost:8080/contact/' + id, contactUpdate)
  }
  getContact(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/contact/' + id);
  }
  
  updatePassword(passwordUpdate: PasswordUpdate, id: number): Observable<any>{
    return this.http.put<any>('http://localhost:8080/user/' + id + '/password', passwordUpdate)
  }

  //  DELETE  //
  
  deleteUser(): Observable<any>{
    if(this.isClient())
      return this.http.delete<any>('http://localhost:8080/client/' + JSON.parse(this.getUserAutenticado()).id);
    else 
      return this.http.delete<any>('http://localhost:8080/establishment/' + JSON.parse(this.getUserAutenticado()).id);

  }
}