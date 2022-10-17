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

  constructor(private router:Router, private service: EstablishmentService, private actRoute: ActivatedRoute) { }

  establishment: EstablishmentWithOrder = {
    id: 0,
    orders: []
  }

  ngOnInit(): void {
    this.getOrders(this.actRoute.snapshot.params['idEstablishment'])
  }

  onVoltar(){
    this.router.navigate(['home-establishment/:id'])
  }

  getOrders(id: number){
  this.service.getOrders(id).subscribe(data => {
    this.establishment = data
  })
  }

}
