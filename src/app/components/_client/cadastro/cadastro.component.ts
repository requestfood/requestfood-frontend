import { ClientService } from 'src/app/services/clientService.service';
import { Component, OnInit } from '@angular/core';
import { ClientRegister } from 'src/app/models/clientRegister';

@Component({
  selector: 'app-cadastro-client',
  templateUrl: './cadastro.component.html',
  styleUrls: ['../../establishment/cadastro/cadastro.component.css']
})
export class CadastroClientComponent implements OnInit {

  client: ClientRegister = {
     name: "",
     password: "",
     surname: "",
     gender: 0,
     birthDate: "",
     email: "",
     phone: ""
    }

  currentTab: number = 0;

  passwordOne: String = "";

  constructor(private service: ClientService) {}

  ngOnInit(): void {}


  doRegister(){
      this.service.addClient(this.client).subscribe(data => {
      this.client = data;
    })
  }

  addTab(n: number) {

    if (this.currentTab >= 0 && this.currentTab <= 3)
      this.currentTab = this.currentTab + n;

    console.log(this.currentTab);
  }
  
  validPassword(){
    if(this.client.password == this.passwordOne){
      console.log('Senhas combinam');
    }else{
    alert('Senhas não combinam');
    }
  }
}
