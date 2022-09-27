import { EstablishmentService } from './../../../services/establishmentService.service';
import { EstablishmentRegister } from './../../../models/establishmentRegister';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-establishment',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroEstablishmentComponent implements OnInit {

 currentTab: number; 

  establishment: EstablishmentRegister = {
    name: "",
    password: "",
    email: "",
    phone: "",
    timeToOpen: "" + ":00",
    timeToClose: "" + ":00",
    description: ""
   }

   passwordTest: String = ''; 

 constructor(private service: EstablishmentService) {
  this.currentTab = 0;
 }

 ngOnInit(): void {}

 doRegister(){
     this.service.addEstablishment(this.establishment).subscribe(data => {
     this.establishment = data;
   })
 }

 /*getter(): Observable<Client>{
   return this.service.getClients().(data => Client{
     this.clients = data;
   })
 }*/

  alterStep(n: number){
    if(this.currentTab >= 0 && this.currentTab <= 4){
      this.currentTab = this.currentTab + n;
    }
  }
 
  validPassword(){
    if(this.establishment.password == this.passwordTest){
      console.log('Senhas combinam');
    }else{
      alert('Senhas não combinam');
    }
  }

}

