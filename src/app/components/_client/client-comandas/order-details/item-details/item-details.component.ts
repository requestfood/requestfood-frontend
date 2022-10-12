import { ItemDetails } from './../../../../../models/order/OrderDetails';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  @Input()
  item: ItemDetails = {
    idItem: 0,
    nameConsumable: "",
    observation: "",
    quantity: 0,
    value: 0
  }

  list: Array<number> = [];

  quantityToList() {

    let index = this.item.quantity

    for (let i = 0; i < index; i++) {
      this.list.push(i)
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.quantityToList()
    
  }

}
