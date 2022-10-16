import { DishUpdate } from './../../../models/consumables/dishUpdate';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Component, OnInit } from '@angular/core';

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
    categoryDish: "0"
  }

  constructor(private consumableService: ConsumableService,
              private actRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  putDish() {
    if (this.dish.name == "")
      this.dish.name = this.consumable.name

    if (this.dish.description == "")
      this.dish.description = this.consumable.description

    if (this.dish.price == null)
      this.dish.price = this.consumable.price

    this.consumableService.putDish(this.dish, this.actRouter.snapshot.params['idConsumable']).subscribe(data => { })
  }

  onBack() {
    this.router.navigate(['consumables/'+ this.actRouter.snapshot.params['idEstablishment']])
  }

}
