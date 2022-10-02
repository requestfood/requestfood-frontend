import { UserService } from './../../../services/userService.service';
import { ActivatedRoute } from '@angular/router';
import { itemOrder } from './../../../models/itemOrder';
import { ConsumableCard } from './../../../models/EstablishmentWithConsumables';
import { Component, OnInit } from '@angular/core';
import { ConsumableService } from 'src/app/services/consumableService.service';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-consumable-info',
  templateUrl: './consumable-info.component.html',
  styleUrls: ['./consumable-info.component.css']
})
export class ConsumableInfoComponent implements OnInit {

  consumable = this.service.getCurrentConsumable()

  order = this.itemService.getCurrentOrder()

  amount: number = 0

  item: itemOrder = {
    idOrder: this.order.id,
    idConsumable: this.consumable.id,
    quantityItem: 0,
    obsItem: ""
  } 

  constructor(
    private service: ConsumableService,
    private itemService: ItemService, 
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.consumable);
  }

  addQuantity(quantity: number = this.item.quantityItem) {
    this.item.quantityItem = quantity + 1
    this.calculateAmount() 
  }

  remQuantity(quantity: number = this.item.quantityItem) {
    this.item.quantityItem = quantity - 1
    this.calculateAmount()
  }

  calculateAmount() {
    this.amount = this.consumable.price * this.item.quantityItem
  }

  createItem() {
    this.itemService.addItem(this.item).subscribe((data: itemOrder) => {})
  }
}
