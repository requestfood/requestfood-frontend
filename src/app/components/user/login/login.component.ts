import { Router } from '@angular/router';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { UserLogin } from './../../../models/userLogin';
import { UserService } from './../../../services/userService.service';
import { ClientService } from 'src/app/services/clientService.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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

  constructor(private userService: UserService, private clientService: ClientService, private establishmentService: EstablishmentService, private router: Router) { }

  ngOnInit(): void {}

  fazerLogin() {
    this.userService.fazerLogin(this.userLogin).subscribe(data => {
      this.holder = data;
      
      if (this.holder.role == "ESTABLISHMENT_USER"){
        this.userService.setUserAutenticado(this.holder.id, this.holder.role);
        this.router.navigate(['/home-establishment/' + this.holder.id])
      }
      else if(this.holder.role == "CLIENT_USER"){
        this.userService.setUserAutenticado(this.holder.id, this.holder.role);
        this.router.navigate(['/home-client/' + this.holder.id])
      }
    })
  }
}

