import { UserService } from './../../../services/User.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  public menuLateralAberto = false;

  userAutenticado = {
    id: 0,
    role: ""
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.mostrarMenuLogin.subscribe(res => this.menuLateralAberto = res)
   }

  ngOnInit(): void {
    this.userService.novoUserAutenticado.subscribe(data => this.userAutenticado = data)
    this.lookTheme()
    this.userAutenticado = JSON.parse(this.userService.getUserAutenticado())
  }

  onMenu() {

    if (this.userService.existsUser()) {
      if (JSON.parse(this.userService.getUserAutenticado()).role == "ESTABLISHMENT_USER")
        this.router.navigate(['/home-establishment/' + this.userAutenticado.id]);
      else if (JSON.parse(this.userService.getUserAutenticado()).role == "CLIENT_USER")
        this.router.navigate(['/home-client/' + this.userAutenticado.id]);
      else
        this.router.navigate([''])
    }
  }

  onMenuLateral() {
    this.menuLateralAberto = !this.menuLateralAberto
  }

  onFechar() {
    this.menuLateralAberto = false
  }

  existsUser(): boolean {
    return this.userService.existsUser()
  }

  typeUser(): string {

    if (this.userService.getUserAutenticado() == null)
      return ""

    return this.userAutenticado.role
  }

  lookTheme(): string {

    if (localStorage.getItem('theme')) {
      document.body.classList.toggle('dark-theme')
      return 'dark'
    }else
      return 'light'
  }

  theme(): string {
    if (localStorage.getItem('theme'))
      return 'white'
    else
      return 'black'
  }
}
