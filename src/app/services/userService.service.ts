import { ContactUpdate, PasswordUpdate } from './../models/UserUpdate';
import { Observable, retryWhen } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { UserLogin } from '../models/userLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mostrarMenuLogin;
  
  userAutenticado = {
    id: 0,
    role: "",
  }

  existsUser(): boolean{
    if(this.userAutenticado.id != 0)
        return true
    else
      return false
    
  }

  isEstablishment(): boolean{

    if(this.existsUser()){
      if(this.userAutenticado.role == "ESTABLISHMENT_USER")
          return true;
    }
    
    return false;
  }

  isClient(): boolean{

    if(this.existsUser()){
      if(this.userAutenticado.role == "CLIENT_USER")
          return true;
    }
    
    return false;
  }

  public setUserAutenticado(id: number, role:string){
    this.userAutenticado.role = role;
    this.userAutenticado.id = id
  }
  public getUserAutenticado():any{
    return this.userAutenticado;
  }

  constructor(private http: HttpClient, ) {
    this.mostrarMenuLogin = new EventEmitter<string>()
  }


  //  POST  //

  fazerLogin(postData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:8080/user/login/', postData);
  }

  //  PUT  //

  updateContact(contactUpdate: ContactUpdate, id: number): Observable<String>{
    return this.http.put<string>('http://localhost:8080/contact/' + id, contactUpdate)
  }
  getContact(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/contact/' + id);
  }
  
  updatePassword(passwordUpdate: PasswordUpdate, id: number): Observable<String>{
    return this.http.put<String>('http://localhost:8080/user/' + id + '/password', passwordUpdate)
  }

}