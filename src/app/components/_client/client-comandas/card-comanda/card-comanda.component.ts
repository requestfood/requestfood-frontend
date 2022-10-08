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

  constructor() { }

  ngOnInit() {
  }

}
