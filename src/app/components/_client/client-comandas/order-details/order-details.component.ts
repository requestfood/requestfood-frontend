import { OrderDetails } from 'src/app/models/order/OrderDetails';
import { UserService } from './../../../../services/User.service';
import { OrderService } from './../../../../services/Order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrder()
  }

  order: OrderDetails = {
    idOrder: 0,
    nameEstablishment: "",
    issueDate: "",
    items: [],
    amount: 0
  }
  

  getOrder(){
    this.orderService.getOrderDetails(this.actRouter.snapshot.params['idOrder']).subscribe(
      (data: OrderDetails) => {
        this.order = data;
        
      })
  }

  doBack(){
    this.router.navigate(['comandasC/' + JSON.parse(this.userService.getUserAutenticado()).id])
  }

}
