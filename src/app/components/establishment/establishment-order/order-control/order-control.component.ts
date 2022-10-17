import { UserService } from './../../../../services/User.service';
import { OrderControl } from './../../../../models/order/orderControl';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/Order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-control',
  templateUrl: './order-control.component.html',
  styleUrls: ['./order-control.component.css']
})
export class OrderControlComponent implements OnInit {


  order: OrderControl = {
    idOrder: 0,
    name: "",
    surname: "",
    amount: 0,
    items: []
  }

  constructor(
    private service: OrderService,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

      this.getOrderControl()
  }

  getOrderControl(){
    this.service.getOrderControl(this.actRoute.snapshot.params['idOrder']).subscribe(data => {
      this.order = data
    })
  }

  onAlterOrderStatus(status: string){
    this.service.updateStatusOrder(status, this.actRoute.snapshot.params['idOrder']).subscribe(() => {})
  }

  onFinishedOrder(){
    this.service.deleteOrder(this.actRoute.snapshot.params['idOrder']).subscribe(() => {})
  }

  onBack(){
    this.router.navigate(['orders-establishment/' + JSON.parse(this.userService.getUserAutenticado()).id])
  }
}
