import { DrinkUpdate } from './../../../models/consumables/drinkUpdate';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-drink',
  templateUrl: './update-drink.component.html',
  styleUrls: ['./update-drink.component.css']
})
export class UpdateDrinkComponent implements OnInit {

  consumable = this.consumableService.getCurrentConsumable()

  drink: DrinkUpdate = {
    id: 0,
    name: "",
    price: null,
    description: "",
    categoryDrink: "",
    alcoholic: false
  }

  constructor(private consumableService: ConsumableService,
              private actRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  putDrink() {
    if (this.drink.name == "")
      this.drink.name = this.consumable.name

    if (this.drink.description == "")
      this.drink.description = this.consumable.description

    if (this.drink.price == null)
      this.drink.price = this.consumable.price

    this.consumableService.putDrink(this.drink, this.actRouter.snapshot.params['idConsumable']).subscribe(data => { })
  }

  onBack() {
    this.router.navigate(['consumables/'+ this.actRouter.snapshot.params['idEstablishment']])
  }

}
