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
    private userService: UserService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getEstablishment(JSON.parse(this.userService.getUserAutenticado()).id)
  }

  getEstablishment(id: number) {
    this.establishmentService.getOne(id).subscribe(data => {
      this.currentEstablishmentUpdate = data;
      this.uploadImages(JSON.parse(this.userService.getUserAutenticado()).id)
    })
  }

  uploadImages(id: number) {
    this.imageService.getImage(id)

    .subscribe((res: any) => {
      console.log(res);
      
      let retrieveResonse = res;
      let base64Data = retrieveResonse.image;
      this.image = 'data:image/jpeg;base64,' + base64Data;
    })
  }
}
