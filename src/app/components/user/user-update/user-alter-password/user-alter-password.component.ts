import { UserService } from './../../../../services/User.service';
import { PasswordUpdate } from '../../../../models/user/UserUpdate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-alter-password',
  templateUrl: './user-alter-password.component.html',
  styleUrls: ['../_client/contact-update/contact-update.component.css']
})
export class UserAlterPasswordComponent implements OnInit {

  passwordUpdate: PasswordUpdate = {
    currentPassword: "",
    newPassword: ""
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  doSave() {
    this.userService.updatePassword(this.passwordUpdate, this.userService.getUserAutenticado().id).subscribe(data => { }, error => {
      if (error.error.text == undefined)
        alert(error.error.message)
      else
        alert(error.error.text)
    })
  }
}
