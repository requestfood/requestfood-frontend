import { HeaderPageComponent } from './../navbar/header-page.component';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item-establishment',
  templateUrl: './menu-item-establishment.component.html',
  styleUrls: ['./menu-item-establishment.component.css']
})
export class MenuItemEstablishmentComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private header: HeaderPageComponent) {}

  ngOnInit(): void {
  }

  onSair(){
    this.userService.setUserAutenticado(0, "")
    this.header.menuLateralAberto = false;
    this.router.navigate(['']);
  }

}
