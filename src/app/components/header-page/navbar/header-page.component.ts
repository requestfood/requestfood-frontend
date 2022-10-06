import { UserService } from './../../../services/userService.service';
import { Router } from '@angular/router';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  ) { }

  ngOnInit(): void {
    this.userService.novoUserAutenticado.subscribe(data => this.userAutenticado = data)

    this.userAutenticado = JSON.parse(this.userService.getUserAutenticado())
  }

  onMenu() {

    if (this.userService.existsUser()) {
      if (this.userAutenticado.role == "ESTABLISHMENT_USER")
        this.router.navigate(['/home-establishment/' + this.userAutenticado.id]);
      else if (this.userAutenticado.role == "CLIENT_USER")
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
}
