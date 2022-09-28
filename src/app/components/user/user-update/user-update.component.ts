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

  constructor() { }

  ngOnInit() {
  }

}
