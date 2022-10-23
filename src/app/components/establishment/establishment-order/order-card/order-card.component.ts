import { UserService } from './../../../../services/User.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderWithDate } from 'src/app/models/establishment/establishmentWithOrder';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {


  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  
  @Input()
  order: OrderWithDate = {
    idOrder: 0,
    nameClient: "",
    IssueDate: "",
    closingDate: "",
    status: ""
  }

  openOrder(){
    if(this.userService.isEstablishment())
      this.router.navigate(['order-control/' + this.order.idOrder])
  }

}
