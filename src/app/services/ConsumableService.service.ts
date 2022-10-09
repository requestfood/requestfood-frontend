import { ConsumableCard } from '../models/establishment/EstablishmentWithConsumables';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {
  
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

  constructor() { }

}
