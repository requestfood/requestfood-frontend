import { OrderService } from './../../../../services/Order.service';
import { OrderToClient } from './../../../../models/_client/ClientWithOrders';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-comanda',
  templateUrl: './card-comanda.component.html',
  styleUrls: ['./card-comanda.component.css']
})
export class CardComandaComponent implements OnInit {

  @Input()
  order: OrderToClient = {
    idOrder: 0,
    imageEstablishment: "",
    nameEstablishment: "",
    issueDate: "",
    orderStatus: ""
  }

  constructor(
  private orderService: OrderService
  ) { }

  ngOnInit() {
  }
  
  deleteOrder(){
    this.orderService.deleteOrder(this.order.idOrder).subscribe(() => {})
    location.reload()
  }
}
