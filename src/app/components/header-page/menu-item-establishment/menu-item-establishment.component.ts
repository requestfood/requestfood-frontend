import { HeaderPageComponent } from './../navbar/header-page.component';
import { UserService } from './../../../services/userService.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item-establishment',
  templateUrl: './menu-item-establishment.component.html',
  styleUrls: ['../menu-item-client/menu-item-client.component.css']
})
export class MenuItemEstablishmentComponent implements OnInit {

  @Input('user')
  userAutenticado = {
    id: 0,
    role: ""
  };


  constructor(
    private userService: UserService, 
    private router: Router, 
    private header: HeaderPageComponent
  ) { }

  ngOnInit(): void {
  }

  onSair() {
    this.userService.setUserAutenticado(0, "")
    this.header.menuLateralAberto = false;
    this.router.navigate(['']);
  }

  onPerfil() {
    if (this.userService.isEstablishment()) 
      this.router.navigate(['user-update']);
    else
      alert('Permissão Negada')
  }

  onComanda() {
    if (this.userService.isEstablishment())
      this.router.navigate([]);
    else
      alert('Permissão negada')
  }

  onConsumiveis(){
    if (this.userService.isEstablishment())
      this.router.navigate(['consumablesC/' + this.userAutenticado.id]);
    else
      alert('Permissão negada')
  }

  onCadastrarConsumivel(){
    
  }

}
