import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../models/core/dialog';
import { MessageService } from './../../../services/core/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/User.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item-client',
  templateUrl: './menu-item-client.component.html',
  styleUrls: ['./menu-item-client.component.css']
})
export class MenuItemClientComponent implements OnInit {

  userAutenticado = {
    id: 0,
    role: ""
  }

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userAutenticado = JSON.parse(this.userService.getUserAutenticado())
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
        if (this.userService.logout()) {
          this.userService.mostrarMenuLogin.emit(false)
          this.router.navigate([''])
        }
      }
    })

  }

  onfindEstablishment() {

    if (this.userAutenticado.role == 'CLIENT_USER')
      this.router.navigate(['/home-client/' + this.userAutenticado.id]);
    else
      this.messageService.add('Permissão Negada')

  }

  onPerfil() {
    if (this.userAutenticado.role == 'CLIENT_USER')
      this.router.navigate(['user-update']);
    else
      this.messageService.add('Permissão Negada')
  }

  onPedidos() {
    if (this.userAutenticado.role == 'CLIENT_USER')
      this.router.navigate(['/comandasC/' + this.userAutenticado.id]);
    else
      this.messageService.add('Permissão Negada')

  }

  theme(): string {
    if (localStorage.getItem('theme'))
      return 'white'
    else
      return 'black'
  }
}
