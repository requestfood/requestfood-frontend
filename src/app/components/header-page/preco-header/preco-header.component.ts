import { OrderStartService } from './../../../services/order-start.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'preco-header',
  templateUrl: './preco-header.component.html',
  styleUrls: ['./preco-header.component.css']
})
export class PrecoHeaderComponent implements OnInit {

  idOrder = JSON.parse(this.orderStartService.getOrder())
  amount: string = '0.00';

  constructor(private orderStartService: OrderStartService) { }

  ngOnInit(): void {
    this.orderStartService.novaComanda.subscribe(result => {
      this.idOrder = result.id
    })
  }


}
