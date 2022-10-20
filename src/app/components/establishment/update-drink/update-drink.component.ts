import { ImageService } from 'src/app/services/core/image.service';
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
    id: NaN,
    name: "",
    price: null,
    description: "",
    categoryDrink: "",
    alcoholic: false
  }

  currentDrink: any = {
    id: NaN,
    name: "",
    price: NaN,
    description: "",
    categoryDrink: "",
    alcoholic: NaN
  }

  constructor(private consumableService: ConsumableService,
    private imageService: ImageService,
    private actRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getDrink()
    this.uploadImages(this.actRouter.snapshot.params['idConsumable'])

    this.imageService.imageComponentisOpen.subscribe(res => {
      this.onRegisterImage = res
    })
  }

  getDrink() {
    this.consumableService.getOneDrink(this.actRouter.snapshot.params['idConsumable']).subscribe((data: any) => {
      this.currentDrink = data
    })
  }

  putDrink() {
    if (this.drink.name == "")
      this.drink.name = this.currentDrink.name

    if (this.drink.description == "")
      this.drink.description = this.currentDrink.description

    if (this.drink.price == null)
      this.drink.price = this.currentDrink.price

    if (this.drink.categoryDrink == "")
      this.drink.categoryDrink = this.enumToNumber()

    this.consumableService.putDrink(this.drink, this.actRouter.snapshot.params['idConsumable']).subscribe((data: any) => { })
  }

  numberToString(): string {
    switch (this.currentDrink.categoryDrink) {
      case 'BEER':
        return 'Cerveja'

      case 'SODA':
        return 'Refrigerante';

      case 'JUICE':
        return 'Suco';

      case 'DISTILLED':
        return 'Destilado';

      case 'WINE':
        return 'Vinho';

      default:
        return 'Whiskey';
    }
  }
  enumToNumber(): string {
    switch (this.currentDrink.categoryDrink) {
      case 'BEER':
        return '0'

      case 'SODA':
        return '1';

      case 'JUICE':
        return '2';

      case 'DISTILLED':
        return '3';

      case 'WINE':
        return '4';

      default:
        return '5';
    }
  }

  uploadImages(id: number) {
    this.imageService.getImage('consumable', id).subscribe((res: any) => {
        let retrieveResonse = res;
        let base64Data = retrieveResonse.image;
        this.consumable.image = 'data:image/jpeg;base64,' + base64Data;
      })
  }


  onRegisterImage: boolean = false
  textOptionsImage: any = {
    title: "Insira a nova imagem",
    textSkip: "Não obrigado",
    textButton: "Concluir",
    typeObject: "DRINK",
    id: this.actRouter.snapshot.params['idConsumable']
  }

  updateImage() {
    this.onRegisterImage = true
  }

  onBack() {
    this.router.navigate(['consumables/' + this.actRouter.snapshot.params['idEstablishment']])
  }

}
