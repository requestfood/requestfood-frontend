import { HttpClient } from '@angular/common/http';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { EstablishmentRegister } from './../../../models/establishmentRegister';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-establishment',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroEstablishmentComponent implements OnInit {

  currentTab: number;

  selectedFile: any;

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
               private sanitizer: DomSanitizer,
               private httpClient: HttpClient) {
     this.currentTab = 0;
    }

 ngOnInit(): void {}

 doRegister(){
    const uploadFormData = new FormData();
    uploadFormData.append(
      'imageFile', this.selectedFile, this.selectedFile.name
    )
    this.service.addEstablishment(this.establishment).subscribe(data => {
      this.establishment = data
    })       
    this.service.addImageEstablishment(uploadFormData, this.establishment.id).subscribe(data => {})
 }

 /*getter(): Observable<Client>{
   return this.service.getClients().(data => Client{
     this.clients = data;
   })
 }*/

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

  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0]

  }
}

