import { UserService } from './../../../services/User.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/ClientService.service';
import { Component, OnInit } from '@angular/core';
import { ClientRegister } from 'src/app/models/_client/clientRegister';

@Component({
  selector: 'app-cadastro-client',
  templateUrl: './cadastro.component.html',
  styleUrls: ['../../establishment/cadastro/cadastro.component.css']
})
export class CadastroClientComponent implements OnInit {

  client: ClientRegister = {
     id: 0,
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

  constructor(
    private service: ClientService,
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit(): void {}


  doRegister(){
    if(this.validPassword()){
      
      this.service.addClient(this.client).subscribe(data => {
        this.client = data;
        
        const user = {
          id: data.id,
          role: 'CLIENT_USER'
         }
         this.userService.setUserAutenticado(user)
         this.userService.novoUserAutenticado.emit(user)
         this.router.navigate(['home-client/' + user.id])
    })
  }

  }

  addTab(n: number) {

    if (this.currentTab >= 0 && this.currentTab <= 3)
      this.currentTab = this.currentTab + n;

    console.log(this.currentTab);
  }
  
  validPassword(): boolean{
    if(this.client.password == this.passwordOne){
      console.log('Senhas combinam');
      return true
    }else{
      alert('Senhas não combinam');
      return false
    }
  }
}
