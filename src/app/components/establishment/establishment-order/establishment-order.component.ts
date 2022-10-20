import { OrderService } from 'src/app/services/Order.service';
import { EstablishmentService } from './../../../services/EstablishmentService.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstablishmentWithOrder } from 'src/app/models/establishment/establishmentWithOrder';

@Component({
  selector: 'app-establishment-order',
  templateUrl: './establishment-order.component.html',
  styleUrls: ['./establishment-order.component.css']
})
export class EstablishmentOrderComponent implements OnInit {

  idSearch: number = NaN

  constructor(
    private router: Router,
    private service: EstablishmentService,
    private orderService: OrderService,
    private actRoute: ActivatedRoute) { }

  establishment: EstablishmentWithOrder = {
    id: 0,
    orders: []
  }

  ngOnInit(): void {
    this.getOrders()
  }

  onVoltar() {
    this.router.navigate(['home-establishment/:id'])
  }

  getOrders(id: number = this.actRoute.snapshot.params['idEstablishment']) {
    this.service.getOrders(id).subscribe(data => {
      this.establishment = data
    })
  }

  getOrderById() {
    if(!isNaN(this.idSearch) && this.idSearch != null && this.idSearch != 0){
      this.service.getOrderById(this.idSearch, this.actRoute.snapshot.params['idEstablishment']).subscribe(data => {
        this.establishment = data
      })
    }else
      this.getOrders()
  }

}
