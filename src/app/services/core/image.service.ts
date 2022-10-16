import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImage(idEstablishment: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/establishment/getImage/' + idEstablishment);
  }

  getConsumableImage(idConsumable: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/consumable/getImage/' + idConsumable);
  }
}


