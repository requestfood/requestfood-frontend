import { HeaderPageComponent } from './../navbar/header-page.component';
import { Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item-client',
  templateUrl: './menu-item-client.component.html',
  styleUrls: ['./menu-item-client.component.css']
})
export class MenuItemClientComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private header: HeaderPageComponent) { }

  ngOnInit(): void {
  }

  onSair(){
    this.userService.setUserAutenticado(0, "")
    this.header.menuLateralAberto = false;
    this.router.navigate(['']);
  }

}
