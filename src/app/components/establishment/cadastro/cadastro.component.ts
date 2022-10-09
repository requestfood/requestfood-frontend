import { Router, ActivatedRoute } from '@angular/router';
import { EstablishmentService } from '../../../services/EstablishmentService.service';
import { EstablishmentRegister } from './../../../models/establishment/establishmentRegister';
import { Component, OnInit } from '@angular/core';

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
             private actRouter: ActivatedRoute) {
  this.currentTab = 0;
 }

 ngOnInit(): void {}

 doRegister(){
     this.service.addEstablishment(this.establishment).subscribe(data => {
     this.establishment = data;
     this.router.navigate(['upload-image/'+ data.id])
   })
 }

  alterStep(n: number){
    if(this.currentTab >= 0 && this.currentTab <= 3){
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

