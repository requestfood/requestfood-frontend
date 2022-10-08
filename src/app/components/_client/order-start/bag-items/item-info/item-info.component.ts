import { ItemDetails } from './../../../../../models/order/OrderDetails';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input()
  item: ItemDetails = {
    nameConsumable: "",
    observation: "",
    quantity: 0,
    value: 0
  }

  constructor() { }

  ngOnInit() {
  }

}
