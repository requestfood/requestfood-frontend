import { Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  cardInfoPessoais: any = {
    title: "Informações Pessoais",
    img: "../../../../assets/profile/icone-pessoais.svg"
  }
  cardInfoContato: any = {
    title: "Informações de Contato",
    img: "../../../../assets/profile/icone-contato.svg"
  }
  cardAlterPasword: any = {
    title: "Alterar Senha",
    img: "../../../../assets/profile/icone-cadeado.svg"
  }
  cardDeleteUser: any = {
    title: "Deletar Usuário",
    img: "../../../../assets/profile/icone-deleteuser.svg"
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  onVoltar() {
    if (this.userService.existsUser()) {
      if (this.userService.isEstablishment())
        this.router.navigate(['/home-establishment/' + this.userService.userAutenticado.id]);
      else
        this.router.navigate(['/home-client/' + this.userService.userAutenticado.id]);
    } else
      this.router.navigate(['']);
  }


  onInfoContato() {
    if (this.userService.existsUser()) {

      if (this.userService.isEstablishment())
        this.router.navigate([this.userService.userAutenticado.id + '/contactE/']);
      else
        this.router.navigate(['/user-update' + this.userService.userAutenticado.id + '/contactC/']);

    } else
      this.router.navigate(['']);
  }

  onInfoPessoais() { 
    if (this.userService.existsUser()) {

      if (this.userService.isEstablishment())
        this.router.navigate([this.userService.userAutenticado.id + '/infoE/']);
      else
        this.router.navigate(['/user-update' + this.userService.userAutenticado.id + '/infoC/']);

    } else
      this.router.navigate(['']);
  }

  onAlterPassword() {
    if (this.userService.existsUser()) {

      if (this.userService.isEstablishment())
        this.router.navigate(['/user-update' + this.userService.userAutenticado.id + '/passwordE/']);
      else
        this.router.navigate(['/user-update' + this.userService.userAutenticado.id + '/passwordC/']);

    } else
      this.router.navigate(['']);
  }
  onDeleteUser() { }
}
