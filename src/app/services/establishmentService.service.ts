import { EstablishmentImage } from './../models/establishment/establishmentImage';
import { EstablishmentUpdate } from '../models/user/UserUpdate';
import { EstablishmentWithOrderReady } from './../models/establishment/EstablishmentWithOrderReady';
import { EstablishmentRegister } from './../models/establishment/establishmentRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstablishmentWithConsumables } from '../models/establishment/EstablishmentWithConsumables';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  endPointEstablishment = "http://localhost:8080/establishment/"

  constructor(private http: HttpClient) { }

  //  POST  //

  addEstablishment(postData: EstablishmentRegister): Observable<EstablishmentRegister> {
    return this.http.post<EstablishmentRegister>(this.endPointEstablishment, postData);
  }


  //  GET  //

  getOrdersReady(id: number): Observable<EstablishmentWithOrderReady>{
    return this.http.get<EstablishmentWithOrderReady>('http://localhost:8080/establishment/orders-ready/' + id);
  }


  //  PUT  //

  updateEstablishment(establishmentUpdate: EstablishmentUpdate, id: number): Observable<String>{
    return this.http.put<String>(this.endPointEstablishment + id, establishmentUpdate)
  }

  //  Image  //

  getEstablishmentImage(id: number): Observable<EstablishmentImage>{
    return this.http.get<EstablishmentImage>(this.endPointEstablishment +'getImage/'+ id);
  }

  //  Orders  //

  setOrderStatus(status: string, id: number): Observable<String>{
    return this.http.post<String>('http://localhost:8080/order/' + status + '/' + id, null);
  }

  // Consumables
  getEstablishmentWithConsumables(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment + id +'/consumable/'+ page);
  }

  getConsumableByName(id: number, name: string, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/consumable/search-name/'+ name +'/'+ page)
  }

  getAllConsumableByOrderByPriceByDesc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/consumable/price/major/'+ page);
  }

  getAllConsumableByOrderByPriceByAsc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/consumable/price/minor/'+ page);
  }

  // Dish
  getAllDish(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/dish/'+ page);
  }

  getDishByName(id: number, name: string, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/dish/search-name/'+ name +'/'+ page)
  }

  getAllDishByOrderByPriceByDesc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/dish/price/major/'+ page);
  }

  getAllDishByOrderByPriceByAsc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/dish/price/minor/'+ page);
  }

  // Drink
  getAllDrink(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/drink/'+ page);
  }

  getDrinkByName(id: number, name: string, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/drink/search-name/'+ name +'/'+ page)
  }

  getAllDrinkByOrderByPriceByDesc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/drink/price/major/'+ page);
  }

  getAllDrinkByOrderByPriceByAsc(id: number, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/drink/price/minor/'+ page);
  }

  getAllDrinkByAlcoholic(id: number, alcoholic: boolean, page: number): Observable<EstablishmentWithConsumables>{
    return this.http.get<EstablishmentWithConsumables>(this.endPointEstablishment+ id +'/drink/alcoholic/'+ alcoholic +'/'+ page);
  }
}
