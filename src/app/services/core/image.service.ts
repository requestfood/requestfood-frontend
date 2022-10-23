import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageisOpen: EventEmitter<boolean> = new EventEmitter()

  constructor(private http: HttpClient) { }

  postImage(typePost: string, id: number, postData: any): Observable<any>{
    return this.http.post('http://localhost:8080/'+ typePost +'/image/' + id, postData)
  }

  getImage(typePost: string, id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/'+ typePost +'/getImage/' + id)
  }
}


