import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  currentTab: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  alterStep(n: number) {
    if (this.currentTab == 0 && n == -1){
      this.router.navigate(['onCadastrarConsumivel'])
    }
    else if (this.currentTab >= 0 && this.currentTab <= 3) {
      this.currentTab = this.currentTab + n;
    }
  }
  doRegister(){}

}