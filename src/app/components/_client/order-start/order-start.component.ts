import { HttpClient } from '@angular/common/http';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { MessageService } from 'src/app/services/core/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createOrder } from './../../../models/createOrder';
import { OrderStartService } from './../../../services/order-start.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-start',
  templateUrl: './order-start.component.html',
  styleUrls: ['./order-start.component.css']
})
export class OrderStartComponent implements OnInit {

  startedOrder: boolean = true

  currentEstablishment = this.service.getCurrentEstablishment();

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(
    private service: OrderStartService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private establishmentService: EstablishmentService,
    private actRouter: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    if (!this.userService.isClient()) {
      this.router.navigate([''])
    } else if (this.currentEstablishment.id == 0)
      this.router.navigate(['home-client/' + JSON.parse(this.userService.getUserAutenticado()).id])

    this.getImage()
  }

  doCreateOrder() {

    if (this.userService.isClient()) {

      if (!localStorage.getItem('order')) {
        let order = {
          idEstablishment: this.currentEstablishment.id,
          idClient: JSON.parse(this.userService.getUserAutenticado()).id
        }

        this.service.addOrder(order)

          .subscribe(
            (data: any) => {
              this.service.setOrder(data)
              this.service.novaComanda.emit(data)
            })

        this.router.navigate(['/consumables/' + this.currentEstablishment.id])
      } else {
        this.messageService.add('Você precisa finalizar a comanda atual')
      }
    } else
      this.router.navigate(['']);
  }

  openMenu() {
    if (this.userService.isClient())
      this.router.navigate(['/consumables/' + this.currentEstablishment.id])
    else
      this.router.navigate(['']);
  }

  onBack() {
    if (this.userService.isClient()) {
      this.router.navigate(['/home-client/' + JSON.parse(this.userService.getUserAutenticado()).id]);
    } else
      this.router.navigate(['']);
  }

  getImage(){
    this.httpClient.get('http://localhost:8080/establishment/getImage/' + this.actRouter.snapshot.params['idEstablishment']).subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.image;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
  }
}
