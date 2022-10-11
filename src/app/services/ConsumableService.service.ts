import { Drink } from './../models/consumables/drink';
import { Dish } from './../models/consumables/dish';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsumableCard } from '../models/establishment/EstablishmentWithConsumables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {

  endPointDish = 'http://localhost:8080/dish'
  endPointDrink = 'http://localhost:8080/drink'
  
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


  // POST DISH

  postDish(postData: Dish): Observable<Dish>{
    return this.http.post<Dish>(this.endPointDish, postData)
  }
  
  // POST DISH
  
  postDrink(postData: Drink): Observable<Drink>{
    return this.http.post<Drink>(this.endPointDrink, postData)
  }
}
