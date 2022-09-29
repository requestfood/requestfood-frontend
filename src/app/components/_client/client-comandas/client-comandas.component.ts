import { Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-comandas',
  templateUrl: './client-comandas.component.html',
  styleUrls: ['./client-comandas.component.css']
})
export class ClientComandasComponent implements OnInit {

  searchName: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  searchByName() { }

  onVoltar() {
    if (this.userService.existsUser() && !this.userService.isEstablishment()) {
      this.router.navigate(['/home-client/' + this.userService.userAutenticado.id]);
    }else
      this.router.navigate(['']);
  }

}
