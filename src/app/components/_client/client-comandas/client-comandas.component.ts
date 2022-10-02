import { ClientService } from 'src/app/services/clientService.service';
import { ClientOrders, OrderToClient } from './../../../models/ClientWithOrders';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-comandas',
  templateUrl: './client-comandas.component.html',
  styleUrls: ['./client-comandas.component.css']
})
export class ClientComandasComponent implements OnInit {

  userAutenticado = this.userService.getUserAutenticado()

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
    if (this.userService.isClient()) {
      this.router.navigate(['/home-client/' + this.userAutenticado.id]);
    } else
      this.router.navigate(['']);
  }

}
