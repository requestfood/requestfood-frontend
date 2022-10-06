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

  constructor(private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSair(){
    if(this.userService.logout())
    this.router.navigate([''])
  }

  onPerfil() {
    if (this.userService.isClient()) 
      this.router.navigate(['user-update']);
    else
      alert('Permissão Negada')
  }

  onPedidos(){
    if (this.userService.isClient())
    this.router.navigate(['/comandasC/' + this.userAutenticado.id]);
  else
    alert('Permissão negada')
  }

}
