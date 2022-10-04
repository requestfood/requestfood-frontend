import { ConsumableService } from 'src/app/services/consumableService.service';
import { UserService } from './../../../services/userService.service';
import { EstablishmentService } from './../../../services/establishmentService.service';
import { EstablishmentWithOrderReady } from './../../../models/establishment/EstablishmentWithOrderReady';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-establishment',
  templateUrl: './home-establishment.component.html',
  styleUrls: ['./home-establishment.component.css']
})
export class HomeEstablishmentComponent implements OnInit{

  establishmentWithOrderReady: EstablishmentWithOrderReady = {
    id: 0,
    name: "",
    ordersFinised: []
  }

  constructor(
    private service: EstablishmentService,
    private actRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private consumableService: ConsumableService
  ) {}

  ngOnInit() {
    this.getOrdersReady();
  }

  getOrdersReady(){
    this.service.getOrdersReady(this.actRouter.snapshot.params['id']).subscribe((data: EstablishmentWithOrderReady) => {
      this.establishmentWithOrderReady = data;
    });
  }

  setStatusOrderToFinished(id: number){
    this.service.setOrderStatus("FINISHED", id).subscribe(() =>{

    });
    this.getOrdersReady();
  }

}
