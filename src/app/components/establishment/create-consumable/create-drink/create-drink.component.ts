import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css']
})
export class CreateDrinkComponent implements OnInit {

  currentTab: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  alterStep(n: number) {
    if (this.currentTab >= 0 && this.currentTab <= 3) {
      this.currentTab = this.currentTab + n;
    }
  }
    createDrink() {
        this.router.navigate(['createDrink']);
  }
}
