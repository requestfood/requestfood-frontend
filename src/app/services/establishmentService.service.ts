import { EstablishmentWithOrderReady } from './../models/EstablishmentWithOrderReady';
import { EstablishmentRegister } from './../models/establishmentRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstablishmentWithConsumables } from '../models/EstablishmentWithConsumables';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(private http: HttpClient) { }

  findEstablishmentById(id: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/establishment/' + id);
  }

  addEstablishment(postData: EstablishmentRegister): Observable<EstablishmentRegister> {
    console.log(postData)
    return this.http.post<EstablishmentRegister>('http://localhost:8080/establishment/', postData);
  }

  getOrdersReady(id: number): Observable<EstablishmentWithOrderReady>{
    return this.http.get<EstablishmentWithOrderReady>('http://localhost:8080/establishment/orders-ready/' + id);
  }

  setOrderStatus(status: string, id: number): Observable<String>{
    return this.http.post<String>('http://localhost:8080/order/' + status + '/' + id, null);
  }

  // Consumables
  getEstablishmentWithConsumables(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/consumable/'+ page);
  }

  getConsumableByName(id: number, name: string, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/consumable/search-name/'+ name +'/'+ page)
  }

  getAllConsumableByOrderByPriceByDesc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/consumable/price/major/'+ page);
  }

  getAllConsumableByOrderByPriceByAsc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/consumable/price/minor/'+ page);
  }

  // Dish
  getAllDish(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/dish/'+ page);
  }

  getDishByName(id: number, name: string, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/dish/search-name/'+ name +'/'+ page)
  }

  getAllDishByOrderByPriceByDesc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/dish/price/major/'+ page);
  }

  getAllDishByOrderByPriceByAsc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/dish/price/minor/'+ page);
  }

  // Drink
  getAllDrink(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/drink/'+ page);
  }

  getDrinkByName(id: number, name: string, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/drink/search-name/'+ name +'/'+ page)
  }

  getAllDrinkByOrderByPriceByDesc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/drink/price/major/'+ page);
  }

  getAllDrinkByOrderByPriceByAsc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/drink/price/minor/'+ page);
  }

  getAllDrinkByAlcoholic(id: number, alcoholic: boolean, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>('http://localhost:8080/establishment/'+ id +'/drink/alcoholic/'+ alcoholic +'/'+ page);
  }
}
