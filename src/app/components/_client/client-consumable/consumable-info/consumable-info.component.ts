import { ConsumableService } from '../../../../services/ConsumableService.service';
import { itemOrder } from './../../../../models/order/itemOrder';
import { MessageService } from 'src/app/services/core/message.service';
import { OrderService } from '../../../../services/Order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/Item-service.service';

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
    idOrder: this.order,
    idConsumable: this.consumable.id,
    quantityItem: 0,
    obsItem: ""
  }

  constructor(
    private service: ConsumableService,
    private orderService: OrderService,
    private messageService: MessageService,

    private itemService: ItemService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.orderService.getOrder()) {
      this.order = JSON.parse(this.orderService.getOrder())
      this.item.idOrder = this.order.id
    }

    this.orderService.novaComanda.subscribe(newOrder => {
      this.item.idOrder = newOrder.id
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
    if (this.orderService.getOrder()) {

      this.itemService.addItem(this.item).subscribe((data: itemOrder) => { })
    } else
      this.messageService.add('Inicie sua comanda para realizar o pedido')
  }

  backPage() {
    this.router.navigate(['consumables/' + this.actRouter.snapshot.params['idEstablishment']])
  }
}
