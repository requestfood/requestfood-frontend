import { MessageService } from 'src/app/services/core/message.service';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Drink } from './../../../../models/consumables/drink';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css']
})
export class CreateDrinkComponent implements OnInit {

  currentTab: number = 0;
  
  newDrink: Drink = {
    id: 0,
    idEstablishment: 0,
    name: "",
    categoryDrink: "",
    price: 0,
    description: "",
    image: null,
    alcoholic: false
  }

  constructor(
    private router: Router,
    private service: ConsumableService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
  }
  alterStep(n: number) {

    if (this.currentTab == 0 && n == -1){
      this.router.navigate(['onCadastrarConsumivel'])
    }else if (this.currentTab >= 0 && this.currentTab <= 3) {
      this.currentTab = this.currentTab + n;  
    }
  }
  onCadastrarConsumivel(){
     this.router.navigate(['onCadastrarConsumivel'])
    }

    doRegister(){
      this.service.postDrink(this.newDrink).subscribe(() => {
        this.message.add('Consumable registered succesfully')
      })
    }
}
