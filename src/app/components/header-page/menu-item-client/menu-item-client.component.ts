import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../models/core/dialog';
import { MessageService } from './../../../services/core/message.service';
import { HeaderPageComponent } from './../navbar/header-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item-client',
  templateUrl: './menu-item-client.component.html',
  styleUrls: ['./menu-item-client.component.css']
})
export class MenuItemClientComponent implements OnInit {


  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSair() {
    const dialogData: DialogConfirm = {
      content: 'Deseja mesmo sair?',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        if (this.userService.logout())
        this.router.navigate([''])
       }
    })

  }

  onfindEstablishment() {
    if (this.userService.getUserAutenticado().role == 'CLIENT_USER')
      this.router.navigate(['/home-client/' + this.actRoute.snapshot.params['id']]);
    else
      this.messageService.add('Permissão Negada')

  }

  onPerfil() {
    if (this.userService.getUserAutenticado().role == 'CLIENT_USER')
      this.router.navigate(['user-update']);
    else
      this.messageService.add('Permissão Negada')
  }

  onPedidos() {
    if (this.userService.getUserAutenticado().role == 'CLIENT_USER')
      this.router.navigate(['/comandasC/' + this.actRoute.snapshot.params['id']]);
    else
      this.messageService.add('Permissão Negada')

  }

}
