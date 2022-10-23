import { ImageService } from 'src/app/services/core/image.service';
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
    private imageService: ImageService,
    private router: Router) {
      this.getDish()
  }

  ngOnInit(): void {
    this.getDish()
    this.uploadImages(this.actRouter.snapshot.params['idConsumable'])

    this.imageService.imageisOpen.subscribe(res => {
      this.onRegisterImage = res
    })
  }

  getDish() {
    this.consumableService.getOneDish(this.actRouter.snapshot.params['idConsumable']).subscribe((data: any) => {
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

    this.consumableService.putDish(this.dish, this.actRouter.snapshot.params['idConsumable']).subscribe((data: any) => { })
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
    typeObject: "DISH",
    id: this.actRouter.snapshot.params['idConsumable']
  }

  updateImage(){
    this.onRegisterImage = true
  }
}
