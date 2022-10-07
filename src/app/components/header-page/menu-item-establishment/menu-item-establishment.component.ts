import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../models/core/dialog';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/core/message.service';

@Component({
  selector: 'app-menu-item-establishment',
  templateUrl: './menu-item-establishment.component.html',
  styleUrls: ['../menu-item-client/menu-item-client.component.css']
})
export class MenuItemEstablishmentComponent implements OnInit {

  userAutenticado = JSON.parse(this.userService.getUserAutenticado())

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private dialog: MatDialog,
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

  onPerfil() {
    if (this.userAutenticado.role == "ESTABLISHMENT_USER")
      this.router.navigate(['user-update']);
    else
      this.messageService.add('Permissão Negada')
  }

  onComanda() {
    if (this.userAutenticado.role == "ESTABLISHMENT_USER")
      this.router.navigate([]);
    else
      this.messageService.add('Permissão Negada')
  }

  onConsumiveis() {
    if (this.userAutenticado.role == "ESTABLISHMENT_USER") {
      this.router.navigate(['consumables/' + this.userAutenticado.id]);
    } else {
      this.messageService.add('Permissão Negada')
    }
  }

  onCadastrarConsumivel() {
    if (this.userAutenticado.role == "ESTABLISHMENT_USER")
      this.router.navigate(['onCadastrarConsumivel']);
    else
      this.messageService.add('Permissão Negada')
    }
  }


