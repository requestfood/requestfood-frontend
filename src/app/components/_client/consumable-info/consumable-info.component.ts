import { MessageService } from 'src/app/services/core/message.service';
import { OrderStartService } from './../../../services/order-start.service';
import { UserService } from './../../../services/userService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { itemOrder } from './../../../models/itemOrder';
import { Component, OnInit } from '@angular/core';
import { ConsumableService } from 'src/app/services/consumableService.service';
import { ItemService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-consumable-info',
  templateUrl: './consumable-info.component.html',
  styleUrls: ['./consumable-info.component.css']
})
export class ClientConsumableInfoComponent implements OnInit {

  consumable = this.service.getCurrentConsumable()

  order: any = {}

  amount: number = 0

  item: itemOrder = {
    idOrder: this.order.id,
    idConsumable: this.consumable.id,
    quantityItem: 0,
    obsItem: ""
  }

  constructor(
    private service: ConsumableService,
    private orderService: OrderStartService,
    private messageService: MessageService,

    private itemService: ItemService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.orderService.getOrder())
      this.order = {} 
      
    this.orderService.novaComanda.subscribe(newOrder => {
      this.order = newOrder
    })
  }

  addQuantity(quantity: number = this.item.quantityItem) {
    this.item.quantityItem = quantity + 1
    this.calculateAmount()
  }

  remQuantity(quantity: number = this.item.quantityItem) {
    this.item.quantityItem = quantity - 1
    this.calculateAmount()
  }

  calculateAmount() {
    this.amount = this.consumable.price * this.item.quantityItem
  }

  createItem() {
    if (this.orderService.getOrder())
      this.itemService.addItem(this.item).subscribe((data: itemOrder) => { })
    else
      this.messageService.add('Inicie sua comanda para realizar o pedido')
  }

  backPage() {
    this.router.navigate(['consumables/' + this.actRouter.snapshot.params['idEstablishment']])
  }
}
