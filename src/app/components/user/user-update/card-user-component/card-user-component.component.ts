import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-user-component',
  templateUrl: './card-user-component.component.html',
  styleUrls: ['./card-user-component.component.css']
})
export class CardUserComponentComponent implements OnInit {

  @Input()
  card: any = {
    title: "Informações Pessoais",
    img: ""
  }

  constructor() { }

  ngOnInit() {
  }

}
