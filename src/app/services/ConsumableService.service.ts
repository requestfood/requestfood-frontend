import { DishUpdate } from './../models/consumables/dishUpdate';
import { Drink } from './../models/consumables/drink';
import { Dish } from './../models/consumables/dish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsumableCard } from '../models/establishment/EstablishmentWithConsumables';
import { Injectable } from '@angular/core';
import { DrinkUpdate } from '../models/consumables/drinkUpdate';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {

  endPointConsumable = 'http://localhost:8080/consumable/'
  endPointDish = 'http://localhost:8080/dish/'
  endPointDrink = 'http://localhost:8080/drink/'
  
  currentConsumable: ConsumableCard = {
    id: 0,
    image: null,
    name: "",
    price: 0,
    description: ""
  }

  getCurrentConsumable() : ConsumableCard{
    return this.currentConsumable
  }

  setCurrentConsumable(currentConsumable: ConsumableCard) {
    this.currentConsumable = currentConsumable
  }

  constructor(private http: HttpClient) { }


  //  DISH

  getOneDish(id: number): Observable<Dish>{
    return this.http.get<Dish>(this.endPointDish + id)
  }

  postDish(postData: Dish): Observable<Dish>{
    return this.http.post<Dish>(this.endPointDish, postData)
  }

  putDish(putData: DishUpdate, id: Number): Observable<String>{
    return this.http.put<String>(this.endPointDish+ id, putData)
  }
  
  //  DRINK

  getOneDrink(id: number): Observable<Drink>{
    return this.http.get<Drink>(this.endPointDrink + id)
  }
  
  postDrink(postData: Drink): Observable<Drink>{
    return this.http.post<Drink>(this.endPointDrink, postData)
  }

  putDrink(putData: DrinkUpdate, id: Number): Observable<String>{
    return this.http.put<String>(this.endPointDrink+ id, putData)
  }

  //  DELETE CONSUMABLE
  deleteConsumable(id: number): Observable<String>{
    return this.http.delete<String>(this.endPointConsumable + id)
  }

  //get p/ type
  getTypeConsumable(id: number): Observable<any>{
    return this.http.get<any>(this.endPointConsumable +'role/'+ id)
  }
}
