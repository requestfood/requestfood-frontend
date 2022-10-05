import { ClientService } from './../../../services/clientService.service';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { catchError, empty, of } from 'rxjs';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from '../../../models/core/dialog';
import { Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  nameClient: string = ""

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private clientService: ClientService,
    private establishmentService: EstablishmentService,
    private router: Router) { }

  ngOnInit() {
    this.onInfoPessoais()
    this.getName()
    this.clientService.clientRefresh.subscribe(data => this.nameClient = data)
  }

  getName(){
    if(this.userService.isClient())
      this.clientService.getOneClient(this.userService.getUserAutenticado().id).subscribe(data => this.nameClient = data.name)
  }

  onVoltar() {
    if (this.userService.isEstablishment())
      this.router.navigate(['/home-establishment/' + this.userService.getUserAutenticado().id]);
    else if (this.userService.isClient())
      this.router.navigate(['/home-client/' + this.userService.getUserAutenticado().id]);
    else
      this.router.navigate(['']);
  }


  onInfoContato() {
    if (this.userService.existsUser())
      this.router.navigate(['./user-update/contact/' + this.userService.getUserAutenticado().id]);
    else
      this.router.navigate(['']);
  }

  onInfoPessoais() {

    if (this.userService.isEstablishment())
      this.router.navigate(['./user-update/profile-establishment/' + this.userService.getUserAutenticado().id]);
    else if (this.userService.isClient())
      this.router.navigate(['./user-update/profile-client/' + this.userService.getUserAutenticado().id]);
    else
      this.router.navigate(['']);
  }

  onAlterPassword() {
    if (this.userService.existsUser()) {
      this.router.navigate(['/user-update/password/' + this.userService.getUserAutenticado().id]);
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
      console.log(result);

      if (result) {
        this.userService.deleteUser()
          .pipe(
            catchError(err => {
              if (err.status == 200) {
                if (this.userService.logout())
                  this.router.navigate([''])
              }
              return of();
            }))
            .subscribe(() => { })
      }
    })
  }
}

