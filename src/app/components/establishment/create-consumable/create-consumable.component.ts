import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-consumable',
  templateUrl: './create-consumable.component.html',
  styleUrls: ['./create-consumable.component.css']
})
export class CreateConsumableComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  createDrink() {
    this.router.navigate(['createDrink']);
  }
  createDish() {
    this.router.navigate(['createDish']);
  }

  theme(): string {
    if (localStorage.getItem('theme'))
      return 'white'
    else
      return 'black'
  }
}

