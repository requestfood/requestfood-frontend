import { FileHandle } from './../../../models/file-handle';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { EstablishmentRegister } from './../../../models/establishmentRegister';
import { Component, OnInit, Input } from '@angular/core';
import { FileHandle } from 'src/app/models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

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
    timeToOpen: "",
    timeToClose: "",
    description: "",
    image: []
   }

   passwordTest: String = '';

   constructor(private service: EstablishmentService,
               private sanitizer: DomSanitizer) {
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

    if(event.target.files){
      const file = event.target.files[0]

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.establishment.image.push(fileHandle)
    }

  }
}

