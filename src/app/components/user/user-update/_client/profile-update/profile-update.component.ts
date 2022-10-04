import { ClientService } from 'src/app/services/clientService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientUpdate, getClientUpdate } from '../../../../../models/user/UserUpdate';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['../contact-update/contact-update.component.css']
})
export class ClientProfileUpdateComponent implements OnInit {

  newClientUpdate: ClientUpdate = {
    name: "",
    surname: "",
    gender: 0
  }

  currentClientUpdate: getClientUpdate = {
    name: "",
    surname: "",
    gender: ""
  }

  constructor(
    private clientService: ClientService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.clientService.getClientProfileUpdate(this.actRouter.snapshot.params['id']).subscribe((data: getClientUpdate) => {
      this.currentClientUpdate = data;
      this.newClientUpdate.gender = this.genderToNumber(data.gender)
    })
  }

  doSave() {
    if (this.newClientUpdate.name == "")
      this.newClientUpdate.name = this.currentClientUpdate.name

    if (this.newClientUpdate.surname == "")
      this.newClientUpdate.surname = this.currentClientUpdate.surname

    if (this.validatorGender())
      this.newClientUpdate.gender = this.genderToNumber(this.currentClientUpdate.gender)

    this.clientService.updateClient(this.newClientUpdate, this.actRouter.snapshot.params['id']).subscribe(data => {
    }, err => {
      if (err instanceof ErrorEvent)
        alert(err.error.message)
      else
        alert(err.error.text)
    }
    )
  }

  validatorGender(): boolean {
    let gender = 0

    if (this.currentClientUpdate.gender == "MALE")
      gender = 0
    else if (this.currentClientUpdate.gender == "FEMALE")
      gender = 1
    else
      gender = 2

    if (this.newClientUpdate.gender == gender)
      return true

    return false
  }

  genderToNumber(gender: string): number {

    if (gender == "MALE")
      return 0
    else if (gender == "FEMALE")
      return 1
    else
      return 2
  }

  genderToString(gender: string): string {

    if (gender == 'MALE')
      return 'Masculino'

    else if (gender == 'FEMALE')
      return 'Feminino'

    else
      return 'Outro'
  }

}
