import { ClientService } from '../../../services/ClientService.service';
import { EstablishmentService } from '../../../services/EstablishmentService.service';
import { catchError, empty, of } from 'rxjs';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from '../../../models/core/dialog';
import { Router } from '@angular/router';
import { UserService } from './../../../services/User.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userAutenticado = JSON.parse(this.userService.getUserAutenticado())

  nameUser: string = ""

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private clientService: ClientService,
    private establishmentService: EstablishmentService,
    private router: Router) { }

  ngOnInit() {
    this.clientService.clientRefresh.subscribe(data => this.nameUser = data)
    this.onInfoPessoais()
    this.getName()
  }

  getName() {
    if (this.userService.isClient())
      this.clientService.getOneClient(this.userAutenticado.id).subscribe(data => this.nameUser = data.name)
    else
      this.establishmentService.getOne(this.userAutenticado.id).subscribe(data => this.nameUser = data.name)
  }

  onVoltar() {
    if (this.userService.isEstablishment())
      this.router.navigate(['/home-establishment/' + this.userAutenticado.id]);
    else if (this.userService.isClient())
      this.router.navigate(['/home-client/' + this.userAutenticado.id]);
    else
      this.router.navigate(['']);
  }


  onInfoContato() {
    if (this.userService.existsUser())
      this.router.navigate(['./user-update/contact/' + this.userAutenticado.id]);
    else
      this.router.navigate(['']);
  }

  onInfoPessoais() {
    if (this.userService.isEstablishment())
      this.router.navigate(['./user-update/profile-establishment/' + this.userAutenticado.id]);
    else if (this.userService.isClient())
      this.router.navigate(['./user-update/profile-client/' + this.userAutenticado.id]);
    else
      this.router.navigate(['']);
  }

  onAlterPassword() {
    if (this.userService.existsUser()) {
      this.router.navigate(['/user-update/password/' + this.userAutenticado.id]);
    } else
      this.router.navigate(['']);
  }

  onDeleteUser() {
    const dialogData: DialogConfirm = {
      content: 'Deseja mesmo deletar a sua conta?',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.userService.deleteUser().subscribe(() => { })

        if (this.userService.logout()) {
          this.router.navigate([''])
          this.userService.mostrarMenuLogin.emit(false)
        }
      }
    })
  }

  onTheme: boolean = false

  toggle() {
    const theme = document.body.classList.toggle('dark-theme')

    if (theme) 
      localStorage.setItem('theme', 'dark-theme')
    else 
      localStorage.removeItem('theme')

    this.onTheme = !this.onTheme
  }

  theme(): string {
    if (localStorage.getItem('theme'))
      return 'white'
    else
      return 'black'
  }
}

