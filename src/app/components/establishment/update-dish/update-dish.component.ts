import { DishUpdate } from './../../../models/consumables/dishUpdate';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/consumables/dish';

@Component({
  selector: 'app-update-dish',
  templateUrl: './update-dish.component.html',
  styleUrls: ['./update-dish.component.css']
})
export class UpdateDishComponent implements OnInit {

  consumable = this.consumableService.getCurrentConsumable()

  dish: DishUpdate = {
    id: 0,
    name: "",
    description: "",
    price: null,
    categoryDish: ""
  }

  currentDish: any = {
    id: NaN,
    name: "",
    description: "",
    price: NaN,
    categoryDish: ""
  }

  constructor(private consumableService: ConsumableService,
    private actRouter: ActivatedRoute,
    private router: Router) {
      this.getDish()
  }

  ngOnInit(): void {

  }

  getDish() {
    this.consumableService.getOneDish(this.consumable.id).subscribe(data => {
      this.currentDish = data
    })
  }

  putDish() {
    if (this.dish.name == "")
      this.dish.name = this.consumable.name

    if (this.dish.description == "")
      this.dish.description = this.consumable.description

    if (this.dish.price == null)
      this.dish.price = this.consumable.price

    if(this.dish.categoryDish == ""){
      this.dish.categoryDish = this.enumToNumber()
    }

    this.consumableService.putDish(this.dish, this.actRouter.snapshot.params['idConsumable']).subscribe(data => { })
  }

  onBack() {
    this.router.navigate(['consumables/' + this.actRouter.snapshot.params['idEstablishment']])
  }

  enumToNumber(): string {
    switch (this.currentDish.categoryDish) {
      case 'CHEESE_BURGUER':
        return '0'

      case 'DESSERT':
        return '1';

      case 'PORTION':
        return '2';

      case 'VEGAN':
        return '3';

      case 'PACKED_LUNCH':
        return '4';

      default:
        return '5';
    }
  }

  numberToString(): string {
    switch (this.currentDish.categoryDish) {
      case 'CHEESE_BURGUER':
        return 'Cheesburguer'

      case 'DESSERT':
        return 'Sobremesa';

      case 'PORTION':
        return 'Porção';

      case 'VEGAN':
        return 'Vegano';

      case 'PACKED_LUNCH':
        return 'Marmita';

      default:
        return 'Sushi';
    }
  }

}
