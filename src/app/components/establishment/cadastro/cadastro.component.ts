import { UserLogin } from './../../../models/user/userLogin';
import { UserService } from './../../../services/User.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EstablishmentService } from '../../../services/EstablishmentService.service';
import { EstablishmentRegister } from './../../../models/establishment/establishmentRegister';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cadastro-establishment',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroEstablishmentComponent implements OnInit {

  currentTab: number;

  establishment: EstablishmentRegister = {
    id: 0,
    name: "",
    password: "",
    email: "",
    phone: "",
    timeToOpen: "",
    timeToClose: "",
    description: "",
  }

  passwordTest: String = '';

  constructor(private service: EstablishmentService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private userService: UserService) {
    this.currentTab = 0;
  }

  ngOnInit(): void { }

  onRegisterImage: boolean = false
  textOptionsImage: any = {
    title: "Deseja Cadastrar uma imagem?",
    textSkip: "Pular Etapa",
    textButton: "Concluir",
    typeObject: "ESTABLISHMENT",
    id: 0
  }

  doRegister() {
    this.service.addEstablishment(this.establishment).subscribe((data: any) => {
      this.establishment = data;

      const user = {
        id: data.id,
        role: 'ESTABLISHMENT_USER'
      }
      this.userService.setUserAutenticado(user)
      this.userService.novoUserAutenticado.emit(user)
      this.onRegisterImage = true
      this.textOptionsImage.id = data.id
    })

  }

  alterStep(n: number) {
    if (this.currentTab >= 0 && this.currentTab <= 3) {
      this.currentTab = this.currentTab + n;
    }
  }

  validPassword() {
    if (this.establishment.password == this.passwordTest) {
      console.log('Senhas combinam');
    } else {
      alert('Senhas não combinam');
    }
  }

}

