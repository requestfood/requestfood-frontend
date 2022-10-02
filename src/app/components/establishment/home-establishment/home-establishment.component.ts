import { EstablishmentService } from './../../../services/establishmentService.service';
import { EstablishmentWithOrderReady } from './../../../models/EstablishmentWithOrderReady';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private service: EstablishmentService,private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.getOrdersReady();
  }

  getOrdersReady(){
    this.service.getOrdersReady(this.router.snapshot.params['id']).subscribe((data: EstablishmentWithOrderReady) => {
      this.establishmentWithOrderReady = data;
    });
  }

  setStatusOrderToFinished(id: number){
    this.service.setOrderStatus("FINISHED", id).subscribe(() =>{

    });
    this.getOrdersReady();
  }

  newPage(){
    
  }

}
