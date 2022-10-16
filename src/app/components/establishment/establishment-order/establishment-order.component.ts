import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishment-order',
  templateUrl: './establishment-order.component.html',
  styleUrls: ['./establishment-order.component.css']
})
export class EstablishmentOrderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onVoltar(){
    this.router.navigate(['home-establishment/:id'])
  }
}
