import { OrderService } from 'src/app/services/Order.service';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { UserService } from './../../../services/User.service';
import { EstablishmentService } from '../../../services/EstablishmentService.service';
import { EstablishmentWithOrderReady } from './../../../models/establishment/EstablishmentWithOrderReady';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-establishment',
  templateUrl: './home-establishment.component.html',
  styleUrls: ['./home-establishment.component.css']
})
export class HomeEstablishmentComponent implements OnInit{

  establishmentWithOrderReady: EstablishmentWithOrderReady = {
    id: 0,
    name: "",
    ordersFinised: []
  }

  userAutenticado = JSON.parse(this.userService.getUserAutenticado())

  constructor(
    private service: EstablishmentService,
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getOrdersReady();
  }

  getOrdersReady(){
    this.service.getOrdersReady(this.userAutenticado.id).subscribe((data: EstablishmentWithOrderReady) => {
      this.establishmentWithOrderReady = data;
    });
  }

  setStatusOrderToFinished(id: number){
    this.orderService.deleteOrder(id).subscribe(() =>{
    });
    this.getOrdersReady();
  }

}
