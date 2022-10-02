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
    idClient: this.userService.userAutenticado.id
  }

  currentEstablishment = this.service.getCurrentEstablishment();

  constructor(private service: OrderStartService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.service.getCurrentEstablishment() );
    
  }

  doCreateOrder() {
    this.service.addOrder(this.order).subscribe((data: createOrder) =>{
      this.order = data
    })
  }

  openEstablishment() {
    this.router.navigate(['/consumablesC/' + this.activatedRoute.snapshot.params['idEstablishment']])
    console.log(this.activatedRoute.snapshot.params['idEstablishment']);
  }

  onBack() {
    if (this.userService.existsUser() && !this.userService.isEstablishment()) {
      this.router.navigate(['/home-client/' + this.userService.userAutenticado.id]);
    } else
      this.router.navigate(['']);
  }
}
