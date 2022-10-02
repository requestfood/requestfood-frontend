import { Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.onInfoPessoais()
  }

  onVoltar() {
    if (this.userService.isEstablishment())
      this.router.navigate(['/home-establishment/' + this.userService.getUserAutenticado().id]);
    else if (this.userService.isClient()) 
      this.router.navigate(['/home-client/' + this.userService.getUserAutenticado().id]);
    else
      this.router.navigate(['']);
  }


  onInfoContato() {

      if (this.userService.isEstablishment())
        this.router.navigate(['./user-update/contactE/' + this.userService.getUserAutenticado().id]);
      else if(this.userService.isClient())
        this.router.navigate(['./user-update/contactC/' + this.userService.getUserAutenticado().id]);
      else
        this.router.navigate(['']);
  }

  onInfoPessoais() {

      if (this.userService.isEstablishment())
        this.router.navigate(['./user-update/profileE/' + this.userService.getUserAutenticado().id]);
      else if(this.userService.isClient())
        this.router.navigate(['./user-update/profileC/' + this.userService.getUserAutenticado().id]);
      else
        this.router.navigate(['']);
  }

  onAlterPassword() {
    if (this.userService.existsUser()) {
      this.router.navigate(['/user-update/password/' + this.userService.getUserAutenticado().id]);
    }else
      this.router.navigate(['']);
  }

  onDeleteUser() { }
}
