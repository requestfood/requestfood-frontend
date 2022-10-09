import { OrderService } from './../../../../../services/Order.service';
import { MessageService } from './../../../../../services/core/message.service';
import { ItemService } from 'src/app/services/Item-service.service';
import { ItemDetails } from './../../../../../models/order/OrderDetails';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input()
  amount: number = 0

  @Input()
  item: ItemDetails = {
    idItem: 0,
    nameConsumable: "",
    observation: "",
    quantity: 0,
    value: 0
  }

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }


  deleteItem(id:number){
    this.orderService.amountOrder.emit(-this.item.value)

    this.itemService.deleteItem(id).subscribe(res => {
      this.messageService.add(res);
    })
    location.reload()
  }

}
