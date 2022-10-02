import { HeaderPageComponent } from './../navbar/header-page.component';
import { Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item-client',
  templateUrl: './menu-item-client.component.html',
  styleUrls: ['./menu-item-client.component.css']
})
export class MenuItemClientComponent implements OnInit {

  @Input('user')
  userAutenticado = {
    id: 0,
    role: ""
  };

  constructor(private userService: UserService, private router: Router, private header: HeaderPageComponent) { }

  ngOnInit(): void {
  }

  onSair(){
    this.userService.setUserAutenticado(0, "")
    this.header.menuLateralAberto = false;
    this.router.navigate(['']);
  }

  onPerfil() {
    if (this.userService.userAutenticado.id != 0) 
      this.router.navigate(['user-update']);
    else
      alert('Permissão Negada')
  }

  onPedidos(){
    if (!this.userService.isEstablishment() && this.userService.userAutenticado.id == this.userAutenticado.id)
    this.router.navigate(['/comandasC/' + this.userAutenticado.id]);
  else
    alert('Permissão negada')
  }

}
