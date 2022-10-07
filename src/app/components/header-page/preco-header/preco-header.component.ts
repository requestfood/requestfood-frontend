import { MessageService } from 'src/app/services/core/message.service';
import { Router } from '@angular/router';
import { OrderStartService } from './../../../services/order-start.service';
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
    private orderStartService: OrderStartService, 
    private router: Router,
    private message: MessageService
    ) { }

  ngOnInit(): void {
    
    if(this.orderStartService.getOrder()){
      this.orderStart = true
    }
    this.orderStartService.novaComanda.subscribe(result => {
        this.orderStart = true
    })
  }


  onBagItems(){
    //if(this.orderStart)
      this.router.navigate(['bagitems/' + 1 /*JSON.parse(this.orderStartService.getOrder()).id*/])
    //else
      this.message.add('Inicie sua comanda para acessar')

  }


}
