import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'preco-header',
  templateUrl: './preco-header.component.html',
  styleUrls: ['./preco-header.component.css']
})
export class PrecoHeaderComponent implements OnInit {

  amount: string = '0.00';

  constructor() { }

  ngOnInit(): void {
  }

}
