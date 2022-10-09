import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../services/User.service';
import { OrderService } from './../../../../services/Order.service';
import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/models/order/OrderDetails';

@Component({
  selector: 'app-bag-items',
  templateUrl: './bag-items.component.html',
  styleUrls: ['./bag-items.component.css']
})
export class BagItemsComponent implements OnInit {

  orderID: any = JSON.parse(this.orderService.getOrder())

  order: OrderDetails = {
    idOrder: 0,
    nameEstablishment: "",
    IssueDate: "",
    items: [],
    amount: 0
  }

  constructor(
    private orderService: OrderService,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.orderService.novaComanda.subscribe(result => {
      this.orderID = result.idOrder
    })

    this.getClientOrderWithItems(this.actRouter.snapshot.params['idOrder'])
  }

  getClientOrderWithItems(id: Number) {
    this.orderService.getOrderDetails(id).subscribe(
      (data: OrderDetails) => {
        this.order = data
      })
  }
}
