import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderWithDate } from 'src/app/models/establishment/establishmentWithOrder';
import { ClientOrders, OrderToClient } from 'src/app/models/_client/ClientWithOrders';
import { OrderService } from 'src/app/services/Order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    console.log(this.order);
    
  }
  
  @Input()
  order: OrderWithDate = {
    idOrder: 0,
    nameClient: "",
    IssueDate: "",
    closingDate: ""
    
  }

}
