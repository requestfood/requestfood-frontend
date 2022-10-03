import { ItemService } from 'src/app/services/item-service.service';
import { createOrder } from './../../../models/createOrder';
import { OrderStartService } from './../../../services/order-start.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-start',
  templateUrl: './order-start.component.html',
  styleUrls: ['./order-start.component.css']
})
export class OrderStartComponent implements OnInit {

  order: createOrder = {
    id: 0,
    idEstablishment: this.activatedRoute.snapshot.params['idEstablishment'],
    idClient: this.userService.getUserAutenticado().id
  }

  currentEstablishment = this.service.getCurrentEstablishment();


  constructor(
    private itemService: ItemService,
    private service: OrderStartService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  doCreateOrder() {
    if (this.userService.isClient()) {
      
      this.service.addOrder(this.order).subscribe(
        (data: createOrder) => {

          this.order = data
          this.itemService.setCurrentOrder(this.order)
        })

      this.router.navigate(['/consumables/' + this.activatedRoute.snapshot.params['idEstablishment']])
    }else
    this.router.navigate(['']);

  }

  openMenu() {
    if(this.userService.isClient())
      this.router.navigate(['/consumables/' + this.activatedRoute.snapshot.params['idEstablishment']])
    else
      this.router.navigate(['']);
  }

  onBack() {
    if (this.userService.isClient()) {
      this.router.navigate(['/home-client/' + this.userService.getUserAutenticado().id]);
    } else
      this.router.navigate(['']);
  }
}
