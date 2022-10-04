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

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.onInfoPessoais()
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
        this.userService.deleteUser().subscribe(() => { }, err => {
          if (err.status == 200) {
            if (this.userService.logout())
              this.router.navigate([''])
          }
        })
      }
    });
  }
}
