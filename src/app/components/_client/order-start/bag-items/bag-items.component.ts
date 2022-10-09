import { catchError, empty } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../../models/core/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../services/User.service';
import { OrderService } from './../../../../services/Order.service';
import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/models/order/OrderDetails';

@Component({
  selector: 'app-bag-items',
  templateUrl: './bag-items.component.html',
  styleUrls: ['./bag-items.component.css']
})
export class BagItemsComponent implements OnInit {

  orderID: any = JSON.parse(this.orderService.getOrder())

  order: OrderDetails = {
    idOrder: 0,
    nameEstablishment: "",
    IssueDate: "",
    items: [],
    amount: 0
  }

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private actRouter: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.orderService.novaComanda.subscribe(result => {
      this.orderID = result.idOrder
    })

    this.getClientOrderWithItems(this.actRouter.snapshot.params['idOrder'])
  }

  getClientOrderWithItems(id: Number) {
    this.orderService.getOrderDetails(id).subscribe(
      (data: OrderDetails) => {
        this.order = data
      })
  }


  doBack() {
    this.router.navigate(['/consumables/' + JSON.parse(this.orderService.getOrder()).idEstablishment])
  }

  sendOrder() {

    const dialogData: DialogConfirm = {
      content: 'Realmente deseja enviar sua comanda para o Estabelecimento ?',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateStatusOrder('SENT', JSON.parse(this.orderService.getOrder()).id).subscribe(res => {})
        localStorage.removeItem('order')
      }
    })
  }

  cancelOrder() {
    const dialogData: DialogConfirm = {
      content: 'Realmente deseja cancelar sua comanda?',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.updateStatusOrder('CANCELED', JSON.parse(this.orderService.getOrder()).id).subscribe(res => {})

        localStorage.removeItem('order')
        this.router.navigate(['comandasC/' + JSON.parse(this.userService.getUserAutenticado()).id])
      }
    })
  }
}
