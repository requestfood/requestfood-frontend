import { OrderService } from './../../../services/Order.service';
import { MessageService } from 'src/app/services/core/message.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'preco-header',
  templateUrl: './preco-header.component.html',
  styleUrls: ['./preco-header.component.css']
})
export class PrecoHeaderComponent implements OnInit {

  amount: string = '0.00';

  orderStart: boolean = false

  constructor(
    private orderService: OrderService,
    private router: Router,
    private message: MessageService) {
  }

  ngOnInit(): void {
    if(this.orderService.getOrder()){
      this.orderStart = true
    }

    this.orderService.novaComanda.subscribe(result => {
      this.orderStart = true;
    })
  }


  onBagItems() {
    if (this.orderStart) {
      this.router.navigate(['bagitems/' + JSON.parse(this.orderService.getOrder()).id])
    } else
      this.message.add('Inicie sua comanda para acessar')

  }


}
