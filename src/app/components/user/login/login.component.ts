import { UserLogin } from './../../../models/user/userLogin';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { ClientService } from 'src/app/services/clientService.service';
import { UserService } from './../../../services/userService.service';
import { Router } from '@angular/router';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { catchError, empty, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  mostrarMenuLogin = new EventEmitter<boolean>();

  userLogin: UserLogin = {
    email: "",
    password: ""
  }

  holder: any = {
    id: 0,
    role: ""
  };

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit(): void { 
  }

  fazerLogin() {
    this.userService.fazerLogin(this.userLogin).subscribe(data => {
      this.holder = data;
      this.userService.setUserAutenticado(this.holder);

      if (this.holder.role == "ESTABLISHMENT_USER"){
        this.router.navigate(['/home-establishment/' + this.holder.id])
      }
      else if(this.holder.role == "CLIENT_USER"){
        this.router.navigate(['/home-client/' + this.holder.id])
      }
      this.userService.mostrarMenuLogin.emit(true)
      this.userService.novoUserAutenticado.emit(data)

    })
  }
}

