import { ClientService } from 'src/app/services/ClientService.service';
import { ClientOrders } from './../../../models/_client/ClientWithOrders';
import { Router } from '@angular/router';
import { UserService } from './../../../services/User.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-comandas',
  templateUrl: './client-comandas.component.html',
  styleUrls: ['./client-comandas.component.css']
})
export class ClientComandasComponent implements OnInit {

  userAutenticado = JSON.parse(this.userService.getUserAutenticado())

  client: ClientOrders = {
    id: 0,
    ordersClient: []
  }

  searchName: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientWithOrders()
  }

  getClientWithOrders() {
    this.clientService.getClientWithOrders(this.userAutenticado.id).subscribe((data: ClientOrders) => {
      this.client = data;
    })
  }

  searchByName() { }

  onVoltar() {
    if (this.userAutenticado.role == 'CLIENT_USER') {
      this.router.navigate(['/home-client/' + this.userAutenticado.id]);
    } else
      this.router.navigate(['']);
  }

}
