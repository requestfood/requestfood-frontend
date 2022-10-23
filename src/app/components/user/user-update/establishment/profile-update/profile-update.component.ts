import { ItemDetails } from './../../../../../models/order/OrderDetails';
import { ClientService } from 'src/app/services/ClientService.service';
import { catchError, empty } from 'rxjs';
import { ImageService } from 'src/app/services/core/image.service';
import { UserService } from './../../../../../services/User.service';
import { EstablishmentService } from './../../../../../services/EstablishmentService.service';
import { EstablishmentUpdate } from './../../../../../models/user/UserUpdate';
import { Component, OnInit } from '@angular/core';
import { PrefixNot } from '@angular/compiler';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class EstablishmentProfileUpdateComponent implements OnInit {

  image: string = ""

  newEstablishmentUpdate: EstablishmentUpdate = {
    name: "",
    timeToOpen: "",
    timeToClose: ""
  }

  currentEstablishmentUpdate: EstablishmentUpdate = {
    name: "",
    timeToOpen: "",
    timeToClose: ""
  }

  constructor(
    private establishmentService: EstablishmentService,
    private clientService: ClientService,
    private userService: UserService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getEstablishment(JSON.parse(this.userService.getUserAutenticado()).id)
    this.imageService.imageisOpen.subscribe(res => this.onRegisterImage = res)
  }

  getEstablishment(id: number) {
    this.establishmentService.getOne(id).subscribe(data => {
      this.currentEstablishmentUpdate = data;
      this.uploadImages(JSON.parse(this.userService.getUserAutenticado()).id)
    })
  }

  doSave() {
    if (this.newEstablishmentUpdate.name == "")
      this.newEstablishmentUpdate.name = this.currentEstablishmentUpdate.name
    else if (this.newEstablishmentUpdate.timeToClose == "")
      this.newEstablishmentUpdate.timeToClose = this.currentEstablishmentUpdate.timeToClose
    else if (this.newEstablishmentUpdate.timeToOpen == "")
      this.newEstablishmentUpdate.timeToOpen = this.currentEstablishmentUpdate.timeToOpen

    this.establishmentService.updateEstablishment(this.newEstablishmentUpdate, JSON.parse(this.userService.getUserAutenticado()).id).subscribe(data => {
    })
    this.clientService.clientRefresh.emit(this.newEstablishmentUpdate.name)
  }

  uploadImages(id: number) {
    this.imageService.getImage('establishment', id)

      .subscribe((res: any) => {
        let retrieveResonse = res;
        let base64Data = retrieveResonse.image;
        this.image = 'data:image/jpeg;base64,' + base64Data;
      })
  }

  onRegisterImage: boolean = false

  textOptionsImage: any = {
    title: "Insira sua nova imagem",
    textSkip: "Não obrigado",
    textButton: "Concluir",
    typeObject: "ESTABLISHMENT",
    id: JSON.parse(this.userService.getUserAutenticado()).id
  }

  updateImage(){
    this.onRegisterImage = true
  }
}
