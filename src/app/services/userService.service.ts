import { Observable } from 'rxjs';
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

  public setUserAutenticado(id: number, role:string){
    this.userAutenticado.role = role;
    this.userAutenticado.id = id
  }

  constructor(private http: HttpClient, ) {
    this.mostrarMenuLogin = new EventEmitter<string>()
  }

  fazerLogin(postData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:8080/user/login/', postData);
  }
}
