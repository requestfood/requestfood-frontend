import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../../models/core/dialog';
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
    private dialog: MatDialog,
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
    const dialogData: DialogConfirm = {
      content: 'Deseja mesmo ' + this.enumToString(status) + ' a comanda?',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.service.updateStatusOrder(status, this.actRoute.snapshot.params['idOrder']).subscribe(() => {})
      }
    })

  }

  enumToString(status: string): string{

    if(status == 'READY')
        return 'enviar';
    else
        return 'cancelar';
  }

  onFinishedOrder(){
    const dialogData: DialogConfirm = {
      content: 'Deseja mesmo finalizar a comanda? Obs: Isso irá deletar a comanda',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.service.deleteOrder(this.actRoute.snapshot.params['idOrder']).subscribe(() => {})
      }
    })
  }

  onBack(){
    this.router.navigate(['orders-establishment/' + JSON.parse(this.userService.getUserAutenticado()).id])
  }
}
