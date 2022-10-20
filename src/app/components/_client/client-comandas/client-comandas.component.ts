import { ImageService } from 'src/app/services/core/image.service';
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
    private clientService: ClientService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getClientWithOrders()
  }

  getClientWithOrders() {
    this.clientService.getClientWithOrders(this.userAutenticado.id).subscribe((data: ClientOrders) => {
      this.client = data;

      this.uploadImages(this.client.ordersClient)
    })
  }
  getClientWithOrdersByStatus(status: string) {
    if (status != "") {
      this.clientService.getClientWithOrdersByOrderStatus(this.userAutenticado.id, status).subscribe((data: ClientOrders) => {
        this.client = data;

        this.uploadImages(this.client.ordersClient)
      })
    } else
      this.getClientWithOrders()
  }
  getClientWithOrdersByEstablishmentName(name: string) {
    if (name != "") {
      this.clientService.getClientWithOrdersByEstablishmentName(this.userAutenticado.id, name).subscribe((data: ClientOrders) => {
        this.client = data;

        this.uploadImages(this.client.ordersClient)
      })
    }
  }

  searchByName() { }

  uploadImages(list: Array<any>) {

    for (let elemnt of list) {
      this.imageService.getImage('establishment', elemnt.idEstablishment).subscribe((res: any) => {
        let retrieveResonse = res;
        let base64Data = retrieveResonse.image;
        elemnt.imageEstablishment = 'data:image/jpeg;base64,' + base64Data;
      })
    }
  }



  onVoltar() {
    if (this.userAutenticado.role == 'CLIENT_USER') {
      this.router.navigate(['/home-client/' + this.userAutenticado.id]);
    } else
      this.router.navigate(['']);
  }

}
