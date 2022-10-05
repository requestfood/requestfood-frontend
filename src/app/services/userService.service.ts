import { Router } from '@angular/router';
import { HeaderPageComponent } from './../components/header-page/navbar/header-page.component';
import { ContactUpdate, PasswordUpdate } from '../models/user/UserUpdate';
import { Observable, catchError, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UserLogin } from '.././models/user/userLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mostrarMenuLogin = new EventEmitter<boolean>()
  
  userAutenticado = {
    id: 0,
    role: "",
  }
  public setUserAutenticado(id: number, role:string){
    this.userAutenticado.role = role;
    this.userAutenticado.id = id
  }
  public getUserAutenticado():any{
    return this.userAutenticado;
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

  public logout(): boolean{
    this.setUserAutenticado(0, "")

    if(!this.existsUser()){
      this.mostrarMenuLogin.emit(false)
      return true
    }else
      return false
  }

  constructor(private http: HttpClient) {
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

  //  DELETE  //
  
  deleteUser(): Observable<any>{
    if(this.isClient())
      return this.http.delete<any>('http://localhost:8080/client/' + this.getUserAutenticado().id);
    else 
      return this.http.delete<any>('http://localhost:8080/establishment/' + this.getUserAutenticado().id);

  }
}